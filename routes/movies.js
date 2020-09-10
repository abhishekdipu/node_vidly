const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

//get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

//get a movie by id
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).send("NOT FOUND: movie with given id is not found");
  }

  res.send(movie);
});

//create a movie

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //see if genre is present or not
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Invalid genre");
  }

  let movie = new Movie({
    title: req.body.title,
    genre: {
      //we don't wanna save whole genre doc, as it may have some unrequired fields like _v(version)
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

//update a movie

router.put("/:id", async (req, res) => {
  //check movie id
  let movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res
      .status(400)
      .send("NOT found: movie with supplied id is not present");
  }

  //validate body
  const { error } = validate(res.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //validate genreid
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Invalid genre");
  }

  movie = await movie.updateOne(
    { _id: req.params.id },
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  res.send(movie);
});

//delete a movie

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("NOT FOUND: movie with given id not found");
  }

  movie = await movie.deleteOne({ _id: req.param.id }, { new: true });

  res.status(204).send(movie);
});

module.exports = router;
