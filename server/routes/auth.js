const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Demo Login (Later connect Mongo User Model)
router.post("/login", (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1d" });

  res.json({ token, user: email });
});

module.exports = router;
