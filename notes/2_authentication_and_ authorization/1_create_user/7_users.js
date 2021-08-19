//routes/users.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, validate, complexityOptions } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");

//create an user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //validate password requirements
  const { passwordValError } = passwordComplexity(complexityOptions).validate(
    req.body.password
  );
  if (passwordValError) {
    res.status(400).send(passwordValError.error.details[0].message);
    return;
  }

  // check if user exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("user is already register");
  }
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  //hash and save the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
