import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import RealChat from "../components/RealChat";

export default function Home({ user, onLogout }) {
  // ✅ Rooms list
  const [rooms, setRooms] = useState([]);

  // ✅ Chat states
  const [activeRoom, setActiveRoom] = useState(null);
  const [chatMode, setChatMode] = useState("private");

  // ✅ Fetch rooms from backend
  useEffect(() => {
    axios.get("http://localhost:4000/api/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  return (
    <div>
      {/* ✅ Navbar */}
      <Navbar user={user} onLogout={onLogout} />

      {/* ✅ Hero */}
      <div className="hero">
        <h1>Find Your Perfect Roommate Stay 🌿</h1>
        <p>Verified rooms with individual + group chat support.</p>
      </div>

      {/* ✅ Room Cards */}
      <div className="grid">
        {rooms.map((room) => (
          <div className="card" key={room._id}>
            <img src={room.image} alt="room" />

            <div className="cardBody">
              <h2>
                {room.city} • {room.location}
              </h2>

              <p className="rent">💰 Rent: ₹{room.rent}/month</p>

              <p className="split">
                👥 Occupants: {room.occupants}/{room.maxOccupancy}
              </p>

              <p className="splitCost">
                🔥 Split Cost: ₹{Math.round(room.rent / room.occupants)} per
                person
              </p>

              {/* Amenities */}
              <div className="badges">
                {room.amenities.map((a, i) => (
                  <span key={i}>{a}</span>
                ))}
              </div>

              {/* ✅ Private Chat Button */}
              <button
                className="chatBtn"
                onClick={() => {
                  setActiveRoom(room);
                  setChatMode("private");
                }}
              >
                💬 Chat Owner
              </button>

              {/* ✅ Group Chat Button */}
              <button
                className="chatBtn"
                style={{
                  marginTop: "10px",
                  background: "#0f172a",
                }}
                onClick={() => {
                  setActiveRoom(room);
                  setChatMode("group");
                }}
              >
                👥 Join Group Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Chat Popup */}
      {activeRoom && (
        <RealChat
          room={activeRoom}
          user={user}
          mode={chatMode}
          onClose={() => setActiveRoom(null)}
        />
      )}
    </div>
  );
}
