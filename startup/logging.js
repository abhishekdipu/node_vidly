require("express-async-errors"); // to handler express async errors
const winston = require("winston"); //for logging error/info to file/console
require("winston-mongodb"); //for logging error/info to mongodb

module.exports = function () {
  //handeling node exception
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncoughtExceptions.log" })
  );

  //handeling async node exception
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  //to log error message in file
  winston.add(winston.transports.File, { filename: "logfile.log" });
  //to log error in mongodb
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly",
    level: "info",
  });
};
