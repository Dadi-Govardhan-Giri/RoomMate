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

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

// Socket Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket Events
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Join Individual Chat Room
  socket.on("join_private", ({ roomId, userId }) => {
    const privateRoom = `${roomId}_${userId}`;
    socket.join(privateRoom);
    console.log("Joined Private Room:", privateRoom);
  });

  // Join Group Room Chat
  socket.on("join_group", (roomId) => {
    socket.join(roomId);
    console.log("Joined Group Room:", roomId);
  });

  // Send Private Message
  socket.on("send_private", ({ roomKey, message }) => {
    io.to(roomKey).emit("receive_private", message);
  });

  // Send Group Message
  socket.on("send_group", ({ roomId, message }) => {
    io.to(roomId).emit("receive_group", message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Start Server
server.listen(4000, () => {
  console.log("Server running on port 4000");
});
