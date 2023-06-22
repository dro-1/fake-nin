const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  nin: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  stateOfOrigin: {
    type: String,
    required: true,
  },
  lgaOfOrigin: {
    type: String,
    required: true,
  },
});

module.exports = {
  Person: mongoose.model("Person", personSchema),
};
