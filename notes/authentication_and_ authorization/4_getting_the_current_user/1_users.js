const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, validate, complexityOptions } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

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

  //get the auth token
  const token = user.generateAuthToken();

  //return res body and token in res header
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));

  //prefix the header argument with 'x-'
});

//get the current user
// this auth middleware is for authorization and not for authentication
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id) //req.user._id is coming from auth
    .select("-password");
  res.send(user);
});

module.exports = router;
