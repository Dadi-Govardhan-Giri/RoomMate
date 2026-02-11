const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


require("dotenv").config();

const roomRoutes = require("./routes/rooms");

const app = express();

// Middlewareaaaaaa
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// Rooms API route
app.use("/api/rooms", roomRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
