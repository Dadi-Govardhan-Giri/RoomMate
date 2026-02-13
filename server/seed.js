const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Room = require("./models/Room");

mongoose.connect(process.env.MONGO_URI);

const rooms = [
  {
    title: "Luxury PG in Hyderabad",
    city: "Hyderabad",
    rent: 6000,
    gender: "Male",
    people: 3,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    title: "Girls Hostel in Vizag",
    city: "Vizag",
    rent: 5000,
    gender: "Female",
    people: 2,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    title: "Shared Flat Bangalore",
    city: "Bangalore",
    rent: 8000,
    gender: "Male",
    people: 4,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    title: "Affordable Room Chennai",
    city: "Chennai",
    rent: 5500,
    gender: "Female",
    people: 3,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  },
  {
    title: "Modern Apartment Delhi",
    city: "Delhi",
    rent: 9000,
    gender: "Male",
    people: 5,
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02c8",
  },
];

async function seedRooms() {
  await Room.deleteMany();
  await Room.insertMany(rooms);
  console.log("Rooms Seeded Successfully ✅");
  process.exit();
}

seedRooms();
