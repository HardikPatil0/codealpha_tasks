const Activity = require("../models/Activity");

const logActivity = async (
  project,
  user,
  text
) => {
  try {
    await Activity.create({
      project,
      user,
      text
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = logActivity;
