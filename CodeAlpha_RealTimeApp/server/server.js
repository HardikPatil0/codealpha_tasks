import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.log);

io.on("connection", socket => {
  socket.on("join-room", room => {
    socket.join(room);
    socket.to(room).emit("user-joined", socket.id);
  });

  socket.on("offer", data =>
    socket.to(data.to).emit("offer", data)
  );

  socket.on("answer", data =>
    socket.to(data.to).emit("answer", data)
  );

  socket.on("ice-candidate", data =>
    socket.to(data.to).emit("ice-candidate", data)
  );

  socket.on("send-message", data => {
    io.to(data.room).emit("receive-message", data.message);
  });

  socket.on("draw", data => {
    socket.to(data.room).emit("draw", data);
  });

  socket.on("file-share", data => {
    socket.to(data.room).emit("file-share", data.file);
  });
});

server.listen(process.env.PORT, () =>
  console.log("Server running on", process.env.PORT)
);
