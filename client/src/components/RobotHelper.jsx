import { useState } from "react";

export default function RobotHelper() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Floating Robot Button */}
      <div className="robotBtn" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* Popup */}
      {open && (
        <div className="robotPopup">
          <h3>Hi! I'm RoomBot 🤖</h3>
          <p>Need help finding the best shared room?</p>

          <ul>
            <li>🏠 Browse available rooms</li>
            <li>💰 Check split rent cost</li>
            <li>💬 Chat with owner instantly</li>
            <li>➕ Add your own room listing</li>
          </ul>

          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
