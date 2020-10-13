const mongoose = require("mongoose");
const winston = require("winston"); //for logging error/info to file

module.exports = function () {
  //mongodb connection
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`connected to mongodb...`));
};
