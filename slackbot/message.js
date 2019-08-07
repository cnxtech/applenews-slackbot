const bot = require('./index');

const getSlackChannel = id => {
  const getPrefix = id => id.slice(0, 4);
  const prefix = getPrefix(id);
  const isToday = prefix === 'tdna';
  const isNews = prefix === 'ncna';
  const isVideo = prefix === 'mmvo';

  if (isNews || isVideo) return 'news-applenews-test';
  else if (isToday) return 'today-applenews-test';

  return null;
};

const concatWithNewline = (originalText, newText) =>
  `${originalText}
  ${newText}`;
const wrapIn = (wrapper, text) => wrapper + text + wrapper;

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
