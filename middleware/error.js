const winston = require("winston");

module.exports = function (err, req, res, next) {
  //winston.log("error", err.message);
  winston.error(err.message);
  //winston.error(err.message, err);// optionally we can also pass error metadata

  /*logging level
  error
  warn
  info
  verbose
  debug
  silly
  */
  res.status(500).send("something sent wrong");
};
