import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ChatPopup from "../components/ChatPopup";

export default function Home({ user }) {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  // Filter Logic
  const filteredRooms = rooms.filter((room) => {
    return (
      (genderFilter === "All" || room.gender === genderFilter) &&
      room.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <Navbar user={user} />

      {/* Hero Section */}
      <div className="hero">
        <h1>Find Your Perfect Roommate Stay 🌿</h1>
        <p>Verified rooms with chat, safety, and comfort.</p>

        {/* Search + Filter */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by city (Vizag, Hyderabad...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Male">Male Only</option>
            <option value="Female">Female Only</option>
          </select>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid">
        {filteredRooms.map((room) => (
          <div className="card" key={room._id}>
            <img src={room.image} alt="room" />

            <div className="cardBody">
              <h2>
                {room.city} • {room.location}
              </h2>

              <p className="rent">₹{room.rent}/month</p>
              <p className="genderTag">👤 {room.gender}</p>

              <div className="badges">
                {room.amenities.map((a, i) => (
                  <span key={i}>{a}</span>
                ))}
              </div>

              <button
                className="chatBtn"
                onClick={() => setActiveRoom(room)}
              >
                💬 Chat Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Popup */}
      {activeRoom && (
        <ChatPopup room={activeRoom} onClose={() => setActiveRoom(null)} />
      )}
    </div>
  );
}
