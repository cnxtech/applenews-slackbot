const bot = require('./index');

bot.client.chat.postMessage({
  text: `Hey! I'm the apple news bot!`,
  channel: 'today-applenews-test',
  token: process.env.SLACK_BOT_TOKEN,
});
