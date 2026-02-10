const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadFile,
  getFiles
} = require("../controllers/fileController");

const router = express.Router();

router.post("/", protect, upload.single("file"), uploadFile);
router.get("/:projectId", protect, getFiles);

module.exports = router;
