const mongoose = require("mongoose");
require("dotenv").config();

const Room = require("./models/Room");

const sampleRooms = [
  {
    city: "Visakhapatnam",
    location: "MVP Colony",
    rent: 9000,
    gender: "Male",
    amenities: ["Bus Stop", "Hospital", "Mess"],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
  },
  {
    city: "Hyderabad",
    location: "Gachibowli",
    rent: 14000,
    gender: "Female",
    amenities: ["Metro", "Temple", "Hospital"],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
  },
  {
    city: "Bangalore",
    location: "Whitefield",
    rent: 18000,
    gender: "Male",
    amenities: ["IT Park", "Bus Stop", "Mess"],
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
  },
  {
    city: "Chennai",
    location: "T Nagar",
    rent: 12000,
    gender: "Female",
    amenities: ["Bus Stop", "Hospital", "Temple"],
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=60",
  },
  {
    city: "Pune",
    location: "Hinjewadi",
    rent: 15000,
    gender: "Male",
    amenities: ["IT Park", "Mess", "Bus Stop"],
    image:
      "https://images.unsplash.com/photo-1560449752-3fd3f5c1c9f3?auto=format&fit=crop&w=800&q=60",
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding ✅");

    await Room.deleteMany(); // clear old rooms
    await Room.insertMany(sampleRooms);

    console.log("Rooms Inserted Successfully 🎉");
    process.exit();
  } catch (err) {
    console.log("Seeding Error ❌", err);
    process.exit(1);
  }
}

seedDB();
