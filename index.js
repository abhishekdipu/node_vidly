const express = require("express");
require("dotenv").config(); //for env var setting
const winston = require("winston");

const app = express();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`listening at port ${port}...`)
);

module.exports = server;
