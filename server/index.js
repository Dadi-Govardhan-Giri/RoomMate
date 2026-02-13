const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Create app FIRST
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const roomRoutes = require("./routes/rooms");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

// Use Routes AFTER app created
app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Server Start
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);

// Socket.io Setup
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_group", (roomId) => {
    socket.join(roomId);
    console.log("Joined Group Room:", roomId);
  });

  socket.on("send_group", ({ roomId, message }) => {
    io.to(roomId).emit("receive_group", message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});
