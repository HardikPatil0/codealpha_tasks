const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const activityRoutes = require("./routes/activityRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activity", activityRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/files", fileRoutes);



app.get("/", (req, res) => {
  res.send("API Running...");
});

// SOCKET.IO SETUP
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// Make io accessible in controllers
app.set("io", io);

// ✅ FIX: use Set instead of Array
const projectUsers = {};

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("joinProject", projectId => {
    socket.join(projectId);

    if (!projectUsers[projectId]) {
      projectUsers[projectId] = new Set();
    }

    projectUsers[projectId].add(socket.id);

    io.to(projectId).emit(
      "onlineUsers",
      projectUsers[projectId].size
    );
  });

  socket.on("disconnect", () => {
    for (const projectId in projectUsers) {
      projectUsers[projectId].delete(socket.id);

      io.to(projectId).emit(
        "onlineUsers",
        projectUsers[projectId].size
      );
    }

    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
