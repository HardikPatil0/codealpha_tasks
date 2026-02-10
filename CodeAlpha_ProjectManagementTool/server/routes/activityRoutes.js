const express = require("express");
const protect = require("../middleware/authMiddleware");
const Activity = require("../models/Activity");

const router = express.Router();

router.get("/:projectId", protect, async (req, res) => {
  try {
    const activity = await Activity.find({
      project: req.params.projectId
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(activity);

  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
});

module.exports = router;
