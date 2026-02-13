const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const roomRoutes = require("./routes/rooms");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/rooms", roomRoutes);
app.use("/api/chat", chatRoutes);

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* Socket Setup */
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinRoom", ({ roomId, mode }) => {
    socket.join(`${roomId}_${mode}`);
    console.log("Joined:", `${roomId}_${mode}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(`${data.roomId}_${data.mode}`).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

/* Start */
server.listen(4000, () => console.log("Server running on port 4000 🚀"));
