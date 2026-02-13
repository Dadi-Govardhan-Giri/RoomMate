const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    city: String,
    location: String,
    rent: Number,
    occupants: Number,

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
