const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lgaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "State",
  },
});

module.exports = {
  LGA: mongoose.model("LGA", lgaSchema),
};
