const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Get Chat History
router.get("/:roomId/:type", authMiddleware, async (req, res) => {
  const { roomId, type } = req.params;

  const messages = await Message.find({ roomId, type }).sort({ createdAt: 1 });

  res.json(messages);
});

// ✅ Save New Message
router.post("/", authMiddleware, async (req, res) => {
  const { roomId, type, text, senderName } = req.body;

  const msg = await Message.create({
    roomId,
    type,
    text,
    senderName,
    senderId: req.user.id,
  });

  res.json(msg);
});

module.exports = router;
