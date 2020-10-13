const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");

//authenticate the user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  //validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(true);
  //instead of returning true, we should return JWT
});

const validate = (requestBody) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(requestBody);
};

module.exports = router;

/*
jwt: json web token is a long string that identifies a user
*/
