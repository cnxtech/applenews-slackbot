const fs = require('fs');
const path = require('path');
const {
  version: appVersion,
  description,
  name,
} = require('../../package.json');

const fileStats = fs.statSync(path.join(__dirname, '../../package.json'));

const statusBuilder = (_, res) => {
  res.send({
    name,
    description,
    appVersion,
    lastModified: fileStats.mtime,
  });
};

module.exports = statusBuilder;
