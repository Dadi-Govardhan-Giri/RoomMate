import { useState } from "react";
import axios from "axios";

export default function AddRoomForm({ onClose, refreshRooms }) {
  const [form, setForm] = useState({
    city: "",
    location: "",
    rent: "",
    occupants: "",
  });

  const [image, setImage] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const data = new FormData();

    data.append("city", form.city);
    data.append("location", form.location);
    data.append("rent", form.rent);
    data.append("occupants", form.occupants);
    data.append("image", image);

    await axios.post("http://localhost:4000/api/rooms/add", data);

    alert("Room Added Successfully ✅");

    refreshRooms();
    onClose();
  }

  return (
    <div className="chatOverlay">
      <div className="chatBox">
        <h2>➕ Add New Room</h2>

        <input
          placeholder="City"
          name="city"
          onChange={handleChange}
        />

        <input
          placeholder="Location"
          name="location"
          onChange={handleChange}
        />

        <input
          placeholder="Rent"
          name="rent"
          type="number"
          onChange={handleChange}
        />

        <input
          placeholder="Occupants"
          name="occupants"
          type="number"
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={handleSubmit}>Upload Room</button>

        <button
          style={{ background: "crimson", marginTop: "10px" }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
