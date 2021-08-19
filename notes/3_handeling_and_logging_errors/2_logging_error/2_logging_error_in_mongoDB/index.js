const express = require("express");
require("dotenv").config();
const error = require("./middleware/error"); //importing MW

const app = express();

//to log error in mongodb
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

//to handel unexpected error: it'll return 500
app.use(error);
