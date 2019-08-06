const slackbotNotificationHandler = require('../../slackbot/message');

const notification = (req, res) => {
  // pass notification to slackBot
  slackbotNotificationHandler(req.body);
  res.send();
};

module.exports = notification;
