import axios from "axios";
import { useEffect, useState } from "react";
import AIRobot from "../components/AIRobot";
import RealChat from "../components/RealChat";
import AddRoom from "./AddRoom";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [chatMode, setChatMode] = useState("private");
  const [showAdd, setShowAdd] = useState(false);

  async function loadRooms() {
    const res = await axios.get("http://localhost:4000/api/rooms");
    setRooms(res.data);
  }

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="page">
      <h1 className="title">🏠 RoomMate India</h1>
      <p className="subtitle">Find affordable shared rooms across India 🌿</p>

      {/* Add Room Button */}
      <button className="addRoomBtn" onClick={() => setShowAdd(true)}>
        ➕ Add Room
      </button>

      {/* Add Room Form */}
      {showAdd && (
        <AddRoom
          onRoomAdded={() => {
            setShowAdd(false);
            loadRooms();
          }}
        />
      )}

      {/* Rooms */}
      <div className="grid">
        {rooms.map((room) => (
          <div className="card" key={room._id}>
            <img src={room.image} alt="room" />

            <h2>
              {room.city} - {room.location}
            </h2>

            <p>💰 Rent: ₹{room.rent}/month</p>
            <p>👥 Occupants: {room.occupants}</p>
            <p>⚡ Split Cost: ₹{Math.floor(room.rent / room.occupants)} each</p>

            <div className="btnRow">
              <button
                onClick={() => {
                  setActiveRoom(room);
                  setChatMode("private");
                }}
              >
                💬 Chat Owner
              </button>

              <button
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

      {/* Chat Popup */}
      {activeRoom && (
        <RealChat
          room={activeRoom}
          mode={chatMode}
          onClose={() => setActiveRoom(null)}
        />
      )}

      {/* AI Robot */}
      <AIRobot />
    </div>
  );
}
