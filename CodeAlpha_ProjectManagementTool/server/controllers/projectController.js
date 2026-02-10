const Project = require("../models/Project");
const User = require("../models/User");
const logActivity = require("../utils/logActivity");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user,
      members: [req.user]
    });

    await logActivity(project._id, req.user, "Created project");

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user
    });

    res.json(projects);

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// INVITE MEMBER
exports.inviteMember = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const project = await Project.findById(req.params.projectId);

    if (!user || !project)
      return res.status(404).json({ msg: "Not found" });

    if (!project.members.includes(user._id)) {
      project.members.push(user._id);
      await project.save();

      await logActivity(
        project._id,
        req.user,
        `Invited ${user.email}`
      );
    }

    res.json({ msg: "Member added" });

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET MEMBERS
exports.getMembers = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.projectId
    ).populate("members", "name email");

    res.json(project.members);

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
