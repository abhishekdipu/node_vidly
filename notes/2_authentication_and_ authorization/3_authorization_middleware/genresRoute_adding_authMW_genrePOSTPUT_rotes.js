const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth"); // to authenticate user before post/put

//get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort();
  res.send(genres);
});

//post request
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    res.status(404).send(`the genres with given id is not present`);
    return;
  }

  res.send(genre);
});

//delete
//authenticate user and validate admin access
router.delete("/:id", auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send(`the genre with given id is not present`);
  }
  // genre = await genre.deleteOne({ _id: req.param.id }, { new: true });

  res.send(genre);
});

module.exports = router;
