const express = require("express");
const mongoose = require("mongoose");
const { required } = require("joi");
const router = express.Router();

const { Customer, validate } = require("../models/customer");

//get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort();
  res.send(customers);
});

//get customer by id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404).send(`NOT FOUND: customer not found`);
    return;
  }

  res.send(customer);
});

//create a customer
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});

//update a customer
router.put("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send(`NOT FOUND: customer not found`);
    return;
  }
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  customer = await Customer.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );

  res.send(customer);
});

//delete a customer
router.delete("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send(`NOT FOUND: customer not found`);
    return;
  }

  customer = await Customer.deleteOne({ _id: req.params.id }, { new: true });

  res.send(customer);
});

module.exports = router;
