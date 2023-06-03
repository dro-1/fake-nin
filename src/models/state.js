const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stateSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  lgas: [
    {
      type: Schema.Types.ObjectId,
      ref: "LGA",
    },
  ],
});

module.exports = {
  State: mongoose.model("State", stateSchema),
};
