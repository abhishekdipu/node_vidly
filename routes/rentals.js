const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");

const Fawn = require("fawn"); //for transaction
Fawn.init(mongoose); //initialize fawn with mongoose object

//get all
router.get("/", async (req, res) => {
  const customers = await Rental.find().sort("-dateOut");
  res.send(customers);
});

//get by id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404).send(`NOT FOUND: customer not found`);
    return;
  }

  res.send(customer);
});

//create a rental
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //see if customer is present or not
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  //see if movie is present or not
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  //see if movie stock is there or not
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  //create a rental
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  //   rental = await rental.save(); //save the rental
  //   movie.numberInStock--;//update movie and save
  //   movie.save();

  try {
    new Fawn.Task()
      .save("rentals", rental) //save take 2 params, 1st: in which collection to save , 2nd: what to
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    res.send(rental);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

/**
 * here in POST we are performing 2 save operation i.e. for change in one data we are updating 2 collection,
 * so if after one save operation some error occurs and 2nd operation is not able to complete then we will
 * have different data saved in 2 diff collections. so we need to make this atomic where either both completes
 * or non. we can do this using "transaction" in sql, and "two phase commit" technique in mongoDB.
 * we can use "fawn" in mongo for same purpose which internally use "two phase commit"
 */

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
