const express = require("express");
require("dotenv").config();
const winston = require("winston"); //for logging error to file
require("winston-mongodb"); //for logging error to mongodb

//importing MW
const error = require("./middleware/error");

const app = express();

//creating test scenario , where we are throwing exception in node process
throw new Error("something went wrong in startup");

//handeling node exception
// process.on("uncaughtException", (ex) => {
//   winston.error(ex.message, ex);
// });
winston.handleExceptions(
  new winston.transports.File({ filename: "uncoughtExceptions.log" })
);

//to handel unexpected error of express: it'll return 500
app.use(error);
