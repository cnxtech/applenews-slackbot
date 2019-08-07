const bot = require('./index');
const getSlackChannel = require('./helpers/getSlackChannel');
const { concatWithNewline, wrapIn } = require('./helpers/text');

const buildMessage = ({
  articleId,
  sectionName,
  interactionType,
  errorType,
  reason,
}) => {
  let text = `Woops, looks like article: ${wrapIn('`', articleId)}`;
  const errorLine = `Due to an error of type: ${wrapIn('`', errorType)}.`;
  const detailsLine = `Details are as follows: ${wrapIn('"', reason)}.`;

  if (sectionName) {
    text = `${text} failed to ${wrapIn(
      '`',
      interactionType,
    )} on section: ${wrapIn('`', sectionName)}.`;
  } else {
    text = concatWithNewline(
      text,
      `failed to ${wrapIn('`', interactionType)}.`,
    );
  }

  if (errorType) text = concatWithNewline(text, errorLine);
  if (reason) text = concatWithNewline(text, detailsLine);

  return text;
};

const notificationHandler = message => {
  const channel = getSlackChannel(message.articleId);
  if (!channel) return null;

  const text = buildMessage(message);

  bot.client.chat.postMessage({
    text,
    channel,
    token: process.env.SLACK_BOT_TOKEN,
  });
};

module.exports = notificationHandler;
