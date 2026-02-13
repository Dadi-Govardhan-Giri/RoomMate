import { useState } from "react";

export default function AIRobot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { from: "bot", text: "Hi 👋 I am RoomMate AI. Ask me anything!" },
  ]);

  function handleSend() {
    if (!msg) return;

    setChat([...chat, { from: "user", text: msg }]);

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          from: "bot",
          text: "🤖 Suggestion: Rooms in metro cities cost more. Try Vizag or Hyderabad for affordable stays!",
        },
      ]);
    }, 800);

    setMsg("");
  }

  return (
    <>
      {/* Floating Button */}
      <div className="robotBtn" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* Popup */}
      {open && (
        <div className="robotPopup">
          <h3>RoomMate AI Assistant</h3>

          <div className="robotChat">
            {chat.map((c, i) => (
              <p key={i} className={c.from}>
                {c.text}
              </p>
            ))}
          </div>

          <div className="robotInput">
            <input
              value={msg}
              placeholder="Ask something..."
              onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
