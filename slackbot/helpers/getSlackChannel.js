const getIdPrefix = id => id.slice(0, 4);

const getSlackChannel = id => {
  const prefix = getIdPrefix(id);
  const isToday = prefix === 'tdna';
  const isNews = prefix === 'ncna';
  const isVideo = prefix === 'mmvo';

  if (isNews || isVideo) return process.env.APPLENEWS_NBCNEWS_CHANNEL;
  else if (isToday) return process.env.APPLENEWS_TODAY_CHANNEL;

  return null;
};

module.exports = getSlackChannel;
