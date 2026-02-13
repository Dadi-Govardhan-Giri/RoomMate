const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

/**
 * GET all rooms (Public)
 */
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

/**
 * POST Add new room (Public for now)
 */
router.post("/add", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.json({ message: "Room Added Successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error adding room" });
  }
});

module.exports = router;
