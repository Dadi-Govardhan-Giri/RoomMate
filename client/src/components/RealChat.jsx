import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function RealChat({ room, user, mode, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  /* Load Messages */
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/chat/${room._id}/${mode}`)
      .then((res) => setMessages(res.data));

    socket.emit("joinRoom", { roomId: room._id, mode });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [room, mode]);

  /* Send Message */
  async function sendMessage() {
    if (!text.trim()) return;

    const msgData = {
      roomId: room._id,
      sender: user.email,
      message: text,
      mode,
    };

    await axios.post("http://localhost:4000/api/chat/send", msgData);

    socket.emit("sendMessage", msgData);

    setText("");
  }

  return (
    <div className="chatOverlay">
      <div className="chatBox">
        <h2>
          💬 {mode === "private" ? "Owner Chat" : "Group Chat"} - {room.city}
        </h2>

        <div className="chatMessages">
          {messages.map((m, i) => (
            <p key={i}>
              <b>{m.sender}:</b> {m.message}
            </p>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={text}
            placeholder="Type message..."
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <button onClick={sendMessage}>Send</button>
        </div>

        <button
          style={{
            marginTop: "15px",
            background: "crimson",
            border: "none",
            padding: "10px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
