const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getMessages,
  sendMessage
} = require("../controllers/messageController");

const router = express.Router();

router.get("/:projectId", protect, getMessages);
router.post("/", protect, sendMessage);

module.exports = router;
