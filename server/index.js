const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// load .env variables
require('dotenv').config();

// initialize slackbot server
require('../slackbot/index.js');

const router = require('./routes');

app.use(bodyParser.json());
app.use(router);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(
    `SlackBot Server is listening for notifications on port: ${port}`,
  );
});
