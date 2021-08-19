const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, validate, complexityOptions } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");

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

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res
    .header("x-auth-token", token) //to return in res header; key: x-auth-token, value : token
    .send(_.pick(user, ["_id", "name", "email"])); //to return in res body

  //by convension prefix the header argument with 'x-'
});

module.exports = router;
/**
 * - it's not required to return jwt in header when user is created, as usually we send the conformation email to user,
 *   and once email is verified then when he logs in we return jwt in response.
 * - but in same case we may not need to validate email if app is for internal purpose, then in such case we can send jwt
 *   in headers when user gets created.
 */
