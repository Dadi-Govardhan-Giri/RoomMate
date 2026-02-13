const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

/**
 * GET Chat Messages
 */
router.get("/:roomId/:mode", async (req, res) => {
  const { roomId, mode } = req.params;

  const messages = await Message.find({ roomId, mode }).sort({
    createdAt: 1,
  });

  res.json(messages);
});

/**
 * POST Send Message
 */
router.post("/send", async (req, res) => {
  const { roomId, sender, message, mode } = req.body;

  const newMsg = await Message.create({
    roomId,
    sender,
    message,
    mode,
  });

  res.json(newMsg);
});

/**
 * GET Notification Count
 */
router.get("/notifications/:user", async (req, res) => {
  const user = req.params.user;

  const count = await Message.countDocuments({
    sender: { $ne: user },
    seen: false,
  });

  res.json({ unread: count });
});

/**
 * Mark Seen
 */
router.put("/seen/:roomId", async (req, res) => {
  const { roomId } = req.params;

  await Message.updateMany(
    { roomId, seen: false },
    { $set: { seen: true } }
  );

  res.json({ message: "Seen updated" });
});

module.exports = router;
