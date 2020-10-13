const Joi = require("joi"); //for body schema validation
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config"); //to store jwtPrivateKey
const { boolean } = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true, //to make sure each email id is different from one another
    minlength: 5,
    maxlength: 256,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

//create a method to generate auth token, which can refrenced anywhere in program
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUserSchema = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(requestBody);
};

//for restriction on password choosing
const complexityOptions = {
  min: 5,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 6, // how many out of above 6 need to followed
};

exports.User = User;
exports.validate = validateUserSchema;
exports.complexityOptions = complexityOptions;
