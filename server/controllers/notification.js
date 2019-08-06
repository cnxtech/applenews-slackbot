const slackbotNotificationHandler = require('../../slackbot/index.js');

const notification = (req, res) => {
  // pass notification to slackBot
  slackbotNotificationHandler(req);
  res.send();
};

module.exports = notification;
