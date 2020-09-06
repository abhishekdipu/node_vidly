const Joi = require("joi"); //for body schema validation
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenreSchema = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(requestBody);
};

exports.Genre = Genre;
exports.validate = validateGenreSchema;
