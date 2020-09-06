const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomerSchema = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(requestBody);
};

exports.Customer = Customer;
exports.validate = validateCustomerSchema;
