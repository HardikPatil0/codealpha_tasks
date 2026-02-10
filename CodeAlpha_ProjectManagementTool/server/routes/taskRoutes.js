const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTaskStatus,
  addComment
} = require("../controllers/taskController");


const router = express.Router();

router.post("/create", protect, createTask);
router.get("/:projectId", protect, getTasks);
router.put("/:taskId", protect, updateTaskStatus);
router.post("/comment/:taskId", protect, addComment);


module.exports = router;
