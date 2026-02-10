const Notification = require("../models/Notification");

const createNotification = async (
  project,
  user,
  text
) => {
  try {
    await Notification.create({
      project,
      user,
      text
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createNotification;
