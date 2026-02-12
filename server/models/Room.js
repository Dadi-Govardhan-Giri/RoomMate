const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  city: String,
  location: String,
  rent: Number,
  gender: String,

  occupants: Number,
  maxOccupancy: Number,

  amenities: [String],
  image: String,
});

module.exports = mongoose.model("Room", roomSchema);
