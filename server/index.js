const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const roomsRoutes = require("./routes/rooms");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/rooms", roomsRoutes);
app.use("/api/auth", authRoutes);

// Socket Server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_group", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_group", ({ roomId, message }) => {
    io.to(roomId).emit("receive_group", message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

server.listen(4000, () => {
  console.log("Server running on port 4000 🚀");
});
