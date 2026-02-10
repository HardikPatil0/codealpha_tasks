const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: String,
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
