const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
