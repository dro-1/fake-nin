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
    type: Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  lgaOfOrigin: {
    type: Schema.Types.ObjectId,
    ref: "LGA",
    required: true,
  },
});

module.exports = {
  Person: mongoose.model("Person", personSchema),
};
