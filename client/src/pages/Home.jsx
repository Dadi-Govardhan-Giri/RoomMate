import axios from "axios";
import { useEffect, useState } from "react";
import RealChat from "../components/RealChat";

export default function Home({ user }) {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [gender, setGender] = useState("all");

  // Chat mode
  const [chatMode, setChatMode] = useState("private");

  // Fetch rooms
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/rooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.log("Rooms Error:", err));
  }, []);

  // Filter Logic
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.title.toLowerCase().includes(search.toLowerCase()) ||
      room.city.toLowerCase().includes(search.toLowerCase());

    const matchesCity = city === "all" || room.city === city;
    const matchesGender = gender === "all" || room.gender === gender;

    return matchesSearch && matchesCity && matchesGender;
  });

  return (
    <div className="homePage">
      {/* Hero Section */}
      <div className="hero">
        <h1>🏠 RoomMate India</h1>
        <p>Find Verified Shared Rooms Across India 🌿</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by city or room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="all">All Cities</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Vizag">Vizag</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="all">All</option>
          <option value="Male">Male Only</option>
          <option value="Female">Female Only</option>
        </select>
      </div>

      {/* Room Grid */}
      <div className="roomGrid">
        {filteredRooms.length === 0 ? (
          <h2 className="noRooms">❌ No rooms available right now</h2>
        ) : (
          filteredRooms.map((room) => (
            <div key={room._id} className="roomCard">
              <img src={room.image} alt="Room" />

              <h2>{room.title}</h2>
              <p>📍 {room.city}</p>
              <p>👥 People Living: {room.people}</p>

              <p className="rent">
                ₹{room.rent} / month <span>(per person)</span>
              </p>

              {/* Chat Buttons */}
              <div className="chatButtons">
                <button
                  onClick={() => {
                    setActiveRoom(room);
                    setChatMode("private");
                  }}
                >
                  💬 Chat Owner
                </button>

                <button
                  className="groupBtn"
                  onClick={() => {
                    setActiveRoom(room);
                    setChatMode("group");
                  }}
                >
                  👥 Group Chat
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Popup */}
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
