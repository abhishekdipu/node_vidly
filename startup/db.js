const mongoose = require("mongoose");
const winston = require("winston"); //for logging error/info to file
const config = require("config");

module.exports = function () {
  //mongodb connection
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`connected to mongodb...`));
};
