const Task = require("../models/Task");
const logActivity = require("../utils/logActivity");
const createNotification = require("../utils/createNotification");


// =====================================
// CREATE TASK
// =====================================
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      project: req.body.project,
      assignedTo: req.body.assignedTo || null,
      priority: req.body.priority || "medium",
      dueDate: req.body.dueDate || null
    });

    // REALTIME EMIT
    const io = req.app.get("io");
    io.to(req.body.project).emit("taskCreated", task);

    // ACTIVITY LOG
    await logActivity(
      req.body.project,
      req.user,
      "Created a new task"
    );

    // NOTIFICATION
    await createNotification(
      req.body.project,
      req.user,
      "Created a new task"
    );

    res.status(201).json(task);

  } catch (error) {
    console.log("CREATE TASK ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


// =====================================
// GET TASKS BY PROJECT
// =====================================
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId
    })
      .populate("assignedTo", "name email")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    console.log("GET TASK ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


// =====================================
// UPDATE TASK STATUS
// =====================================
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status: req.body.status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        msg: "Task not found"
      });
    }

    const io = req.app.get("io");
    io.to(task.project.toString())
      .emit("taskUpdated", task);

    await logActivity(
      task.project,
      req.user,
      `Changed task status to ${req.body.status}`
    );

    await createNotification(
      task.project,
      req.user,
      "Updated task status"
    );

    res.json(task);

  } catch (error) {
    console.log("UPDATE TASK ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


// =====================================
// ADD COMMENT TO TASK
// =====================================
exports.addComment = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.taskId
    );

    if (!task) {
      return res.status(404).json({
        msg: "Task not found"
      });
    }

    task.comments.push({
      user: req.user,
      text: req.body.text
    });

    await task.save();

    const io = req.app.get("io");
    io.to(task.project.toString())
      .emit("commentAdded", task);

    await logActivity(
      task.project,
      req.user,
      "Added a comment"
    );

    await createNotification(
      task.project,
      req.user,
      "Added a comment on task"
    );

    res.json(task);

  } catch (error) {
    console.log("COMMENT ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
