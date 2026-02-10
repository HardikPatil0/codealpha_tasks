const Message = require("../models/Message");
const logActivity = require("../utils/logActivity");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      project: req.params.projectId
    }).populate("user", "name");

    res.json(messages);

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text, project } = req.body;

    const message = await Message.create({
      text,
      project,
      user: req.user
    });

    const io = req.app.get("io");
    io.to(project).emit("newMessage", message);

    await logActivity(
      project,
      req.user,
      "Sent a chat message"
    );

    res.json(message);

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
