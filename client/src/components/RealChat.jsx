import { useState } from "react";

export default function RealChat({ room, mode, onClose }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    if (!msg) return;

    setMessages([...messages, msg]);
    setMsg("");
  }

  return (
    <div className="chatOverlay">
      <div className="chatBox">
        <div className="chatHeader">
          <h2>
            {mode === "private" ? "💬 Private Chat" : "👥 Group Chat"} -{" "}
            {room.city}
          </h2>

          <button onClick={onClose}>✖</button>
        </div>

        <div className="chatMessages">
          {messages.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>

        <div className="chatInput">
          <input
            placeholder="Type message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
