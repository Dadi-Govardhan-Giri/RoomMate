const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  city: String,
  location: String,
  rent: Number,
  occupants: Number,
  image: String,
});

module.exports = mongoose.model("Room", roomSchema);
