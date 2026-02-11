import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function RealChat({ room, user, mode, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Join chat room
  useEffect(() => {
    if (mode === "private") {
      const privateKey = `${room._id}_${user._id}`;
      socket.emit("join_private", { roomId: room._id, userId: user._id });

      socket.on("receive_private", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => socket.off("receive_private");
    }

    if (mode === "group") {
      socket.emit("join_group", room._id);

      socket.on("receive_group", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => socket.off("receive_group");
    }
  }, [room, user, mode]);

  // Send Message
  function sendMessage() {
    if (!text.trim()) return;

    const msgData = {
      sender: user.name,
      text,
      time: new Date().toLocaleTimeString(),
    };

    if (mode === "private") {
      const privateKey = `${room._id}_${user._id}`;
      socket.emit("send_private", {
        roomKey: privateKey,
        message: msgData,
      });
    }

    if (mode === "group") {
      socket.emit("send_group", {
        roomId: room._id,
        message: msgData,
      });
    }

    setText("");
  }

  return (
    <div className="chatOverlay">
      <div className="chatBox">
        <div className="chatHeader">
          <h3>
            {mode === "private" ? "Private Chat" : "Group Chat"} - {room.city}
          </h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="chatMessages">
          {messages.map((m, i) => (
            <p key={i} className="userMsg">
              <b>{m.sender}</b>: {m.text}
              <br />
              <small>{m.time}</small>
            </p>
          ))}
        </div>

        <div className="chatInput">
          <input
            placeholder="Type message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
