import axios from "axios";
import { useState } from "react";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSignup() {
    await axios.post("http://localhost:4000/api/auth/signup", form);
    alert("Signup Successful ✅ Now Login");
    onSignup();
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Create Account</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />

        <input name="email" placeholder="Email" onChange={handleChange} />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />

        <select name="gender" onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
        </select>

        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}
