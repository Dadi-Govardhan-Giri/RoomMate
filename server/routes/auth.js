const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, gender } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  await User.create({ name, email, password, gender });

  res.json({ message: "Signup successful ✅" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found ❌" });

  if (user.password !== password)
    return res.status(400).json({ message: "Wrong password ❌" });

  const token = jwt.sign({ id: user._id }, "SECRET_KEY");

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
