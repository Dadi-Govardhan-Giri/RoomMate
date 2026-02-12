import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({ user, onLogout }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/api/rooms", {
        headers: { Authorization: token },
      })
      .then((res) => setRooms(res.data))
      .catch(() => {
        alert("Please login again ❌");
        onLogout();
      });
  }, []);

  return (
    <div className="page">
      <h1>Welcome {user.name} 🌿</h1>

      <button onClick={onLogout}>Logout</button>

      <div className="grid">
        {rooms.map((room) => (
          <div className="card" key={room._id}>
            <img src={room.image} alt="" />

            <h2>
              {room.city} • {room.location}
            </h2>

            <p>Rent: ₹{room.rent}</p>
            <p>Split: ₹{Math.round(room.rent / room.occupants)} per person</p>
          </div>
        ))}
      </div>
    </div>
  );
}
