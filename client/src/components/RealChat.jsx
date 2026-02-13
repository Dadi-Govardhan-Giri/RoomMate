import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function RealChat({ room, user, mode, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Load old messages from MongoDB
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:4000/api/chat/${room._id}/${mode}`, {
        headers: { Authorization: token },
      })
      .then((res) => setMessages(res.data));
  }, [room, mode]);

  // Join socket room
  useEffect(() => {
    socket.emit("join_group", room._id);

    socket.on("receive_group", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receive_group");
  }, [room]);

  // Send message
  async function sendMessage() {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    const msgData = {
      sender: user.name,
      text,
      time: new Date().toLocaleTimeString(),
    };

    // Save in DB
    await axios.post(
      "http://localhost:4000/api/chat",
      {
        roomId: room._id,
        type: mode,
        text,
        senderName: user.name,
      },
      { headers: { Authorization: token } }
    );

    // Send live
    socket.emit("send_group", {
      roomId: room._id,
      message: msgData,
    });

    setText("");
  }

  return (
    <div className="chatOverlay">
      <div className="chatBox">
        <div className="chatHeader">
          <h3>
            {mode.toUpperCase()} Chat - {room.city}
          </h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="chatMessages">
          {messages.map((m, i) => (
            <p key={i} className="userMsg">
              <b>{m.senderName || m.sender}</b>: {m.text}
            </p>
          ))}
        </div>

        <div className="chatInput">
          <input
            value={text}
            placeholder="Type message..."
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
