const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Demo Login Route
router.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate Token
  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1d" });

  res.json({
    token,
    user: email,
  });
});

module.exports = router;
