const { App: SlackBot } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const bot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const port = process.env.PORT || 3002;

(async () => {
  // Start your app
  await bot.start();
  console.log(`⚡️ SlackBot is running on port ${port}!`);
})();

module.exports = bot;
