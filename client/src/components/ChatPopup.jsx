import { useState } from "react";

export default function ChatPopup({ room, onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hi, is this room available?", sender: "user" },
  ]);

  const [newMsg, setNewMsg] = useState("");

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    setMessages([...messages, { text: newMsg, sender: "me" }]);
    setNewMsg("");
  };

  return (
    <div className="chatOverlay">
      <div className="chatBox">
        <div className="chatHeader">
          <h3>{room.city} Owner</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="chatMessages">
          {messages.map((msg, i) => (
            <p key={i} className={msg.sender === "me" ? "myMsg" : "userMsg"}>
              {msg.text}
            </p>
          ))}
        </div>

        <div className="chatInput">
          <input
            placeholder="Type message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
