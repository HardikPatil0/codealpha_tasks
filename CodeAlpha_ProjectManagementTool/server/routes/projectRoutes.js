const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  inviteMember,
  getMembers
} = require("../controllers/projectController");

const router = express.Router();

router.post("/create", protect, createProject);
router.get("/", protect, getProjects);
router.post("/invite/:projectId", protect, inviteMember);
router.get("/members/:projectId", protect, getMembers);

module.exports = router;
