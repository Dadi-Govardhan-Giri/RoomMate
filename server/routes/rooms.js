const express = require("express");
const Room = require("../models/Room");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Rooms Route
router.get("/", authMiddleware, async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

module.exports = router;
