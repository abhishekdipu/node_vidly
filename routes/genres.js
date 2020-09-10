const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");

//get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort();
  res.send(genres);
});

//post request
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    //res.status(400).send(error);
    return;
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send(`the genre with given id is not present`);
  }
  genre = await genre.deleteOne({ _id: req.param.id }, { new: true });

  res.send(genre);
});

//get by id
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send(`the genre with given id is not present`);
    return;
  }
  res.send(genre);
});

module.exports = router;
