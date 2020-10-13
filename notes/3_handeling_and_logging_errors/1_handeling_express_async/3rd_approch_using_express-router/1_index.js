const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
require("express-async-errors"); // to handler express async errors
//importing routes
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));
