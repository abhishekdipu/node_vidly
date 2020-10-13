const express = require("express");
require("dotenv").config(); //for env var setting
const winston = require("winston");

const app = express();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening at port ${port}...`));
