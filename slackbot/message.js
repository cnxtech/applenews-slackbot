const bot = require('./index');

const getChannel = id => {
  const getPrefix = id => id.slice(0, 4);
  const prefix = getPrefix(id);
  const isToday = prefix === 'tdna';
  const isNews = prefix === 'ncna';
  const isVideo = prefix === 'mmvo';

  if (isNews || isVideo) return 'news-applenews-test';
  else if (isToday) return 'today-applenews-test';

  return null;
};

const concatWithSpace = (originalText, newText) => `${originalText} ${newText}`;
const wrapIn = (wrapper, text) => '`' + text + '`';

const buildMessage = ({
  articleId,
  sectionName,
  interactionType,
  errorType,
  reason,
}) => {
  let text = `Article: ${wrapIn('`', articleId)}`;
  const errorLine = `Due to an error of type: ${wrapIn('`', errorType)}.`;
  const detailsLine = `Details are as follows: ${wrapIn('"', reason)}.`;

  if (sectionName) {
    text = concatWithSpace(
      text,
      `failed to ${wrapIn('`', interactionType)} on section: ${wrapIn(
        '`',
        sectionName,
      )}.`,
    );
  } else {
    text = concatWithSpace(text, `failed to ${wrapIn('`', interactionType)}.`);
  }

  if (errorType) text = concatWithSpace(text, errorLine);
  if (reason) text = concatWithSpace(text, detailsLine);

  return text;
};

const notificationHandler = message => {
  const channel = getChannel(message.articleId);
  if (!channel) return null;

  const text = buildMessage(message);

  bot.client.chat.postMessage({
    text,
    channel,
    token: process.env.SLACK_BOT_TOKEN,
  });
};

module.exports = notificationHandler;
