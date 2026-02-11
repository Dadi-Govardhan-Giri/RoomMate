const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    location: { type: String, required: true },
    rent: { type: Number, required: true },

    gender: { type: String, required: true },

    amenities: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
