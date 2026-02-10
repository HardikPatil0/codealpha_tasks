const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  action: String
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
