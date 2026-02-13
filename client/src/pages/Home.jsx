import axios from "axios";
import { useEffect, useState } from "react";
import RealChat from "../components/RealChat";
import RobotHelper from "../components/RobotHelper";

export default function Home({ user }) {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [chatMode, setChatMode] = useState("private");

  // ✅ Redirect if not logged in
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  // ✅ Fetch rooms from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/api/rooms", {
        headers: { Authorization: token },
      })
      .then((res) => setRooms(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <h1 className="title">🏠 RoomMate India</h1>
      <RobotHelper />

      <button
        className="addRoomBtn"
        onClick={() => (window.location.href = "/add-room")}
      >
        ➕ Post a Room
      </button>

      <p className="subtitle">Find affordable shared rooms across India 🌿</p>

      {/* ✅ CHAT POPUP */}
      {activeRoom && (
        <RealChat
          room={activeRoom}
          user={user}
          mode={chatMode}
          onClose={() => setActiveRoom(null)}
        />
      )}

      {/* ✅ ROOM CARDS */}
      <div className="grid">
        {rooms.map((room) => (
          <div key={room._id} className="roomCard">
            <img src={room.image} alt="room" className="roomImage" />

            <h2>
              {room.city} - {room.location}
            </h2>

            <p>💰 Rent: ₹{room.rent}/month</p>
            <p>👥 Occupants: {room.occupants}</p>

            <p className="split">
              Split Cost: ₹{Math.round(room.rent / room.occupants)} each
            </p>

            {/* ✅ Chat Buttons */}
            <div className="chatActions">
              <button
                className="chatBtn"
                onClick={() => {
                  setActiveRoom(room);
                  setChatMode("private");
                }}
              >
                💬 Chat Owner
              </button>

              <button
                className="chatBtn group"
                onClick={() => {
                  setActiveRoom(room);
                  setChatMode("group");
                }}
              >
                👥 Group Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
