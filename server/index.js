const express = require('express');
const app = express();
// load .env variables
require('dotenv').config();
// initialize slackbot server
require('../slackbot/index.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `SlackBot Server is listening for notifications on port: ${port}`,
  );
});
