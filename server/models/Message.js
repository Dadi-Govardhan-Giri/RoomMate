const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },

    // "private" or "group"
    type: { type: String, required: true },

    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderName: String,

    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
