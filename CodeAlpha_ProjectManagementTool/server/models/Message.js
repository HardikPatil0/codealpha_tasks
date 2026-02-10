const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
