//create post route for user
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");

//get all genres
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user is already register");

  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();

  //   res.send({
  //    _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //   });

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
