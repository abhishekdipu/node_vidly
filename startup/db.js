const mongoose = require("mongoose");
const winston = require("winston"); //for logging error/info to file
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  //mongodb connection
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`connected to ${db}...`));
};
