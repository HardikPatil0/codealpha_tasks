const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  try {
    const file = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      project: req.body.project,
      uploadedBy: req.user
    });

    res.json(file);

  } catch (err) {
    res.status(500).json({ msg: "Upload failed" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({
      project: req.params.projectId
    });

    res.json(files);

  } catch {
    res.status(500).json({ msg: "Error fetching files" });
  }
};
