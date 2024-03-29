const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config"); // for jwt private key
require("express-async-errors"); // to handler express async errors
const winston = require("winston"); //for logging error to file
require("winston-mongodb"); //for logging error to mongodb
//importing routes
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

//importing MW
const error = require("./middleware/error");

const app = express();

//creating test scenario , where we are throwing exception in node process
throw new Error("something went wrong in startup");

//handeling node exception
process.on("uncaughtException", (ex) => {
  console.log("we got an uncought exception");
  winston.error(ex.message, ex);
});

//to log error message in file
winston.add(winston.transports.File, { filename: "logfile.log" });
//to log error in mongodb
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

//to verify if jwtPrivateKey is set in env var when app starts
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1); //0: success, anything else = failure
}

//mongodb connection
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`connected to mongodb...`))
  .catch((err) => console.error(`can't connect to db: ${err.message}`));

//express middleware ,for post/put
app.use(express.json()); //it'll read the req and if there is json object present then it'll parse that nd set req.body property

//routing
app.use("/", home);
app.use("/api/genres", genres); //for any api call starts with '/api/courses' use courses (which is imported)
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

//to handel unexpected error of express: it'll return 500
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));
