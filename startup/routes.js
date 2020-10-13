const express = require("express");

const genres = require("../routes/genres");
const home = require("../routes/home");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
//importing error MW
const error = require("../middleware/error");

module.exports = function (app) {
  //express middleware ,for post/put
  app.use(express.json()); //it'll read the req and if there is json object present then it'll parse that nd set req.body property

  //routes
  app.use("/", home);
  app.use("/api/genres", genres); //for any api call starts with '/api/courses' use courses (which is imported)
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  //to handel unexpected error of express: it'll return 500
  app.use(error);
};
