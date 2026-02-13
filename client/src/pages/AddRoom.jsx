import axios from "axios";
import { useState } from "react";

export default function AddRoom() {
  const [form, setForm] = useState({
    city: "",
    location: "",
    rent: "",
    occupants: "",
    image: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    await axios.post("http://localhost:4000/api/rooms/add", form);
    alert("Room Added Successfully ✅");
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>➕ Add New Room</h2>

        <input name="city" placeholder="City" onChange={handleChange} />

        <input
          name="location"
          placeholder="Area / Location"
          onChange={handleChange}
        />

        <input name="rent" placeholder="Monthly Rent" onChange={handleChange} />

        <input
          name="occupants"
          placeholder="Number of People"
          onChange={handleChange}
        />

        <input name="image" placeholder="Image URL" onChange={handleChange} />

        <button onClick={handleSubmit}>Submit Room</button>
      </div>
    </div>
  );
}
