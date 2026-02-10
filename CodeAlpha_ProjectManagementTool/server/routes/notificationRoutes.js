const express = require("express");
const protect = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

const router = express.Router();

router.get("/:projectId", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({
      project: req.params.projectId
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
});

module.exports = router;
