import { useState } from "react";

export default function Signup({ onSignup, onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "Male",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSignup() {
    alert("Signup Successful ✅ Now Login");
    onSignup();
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Create Account ✨</h2>
        <p>Join RoomMate India today</p>

        <input name="name" placeholder="Full Name" onChange={handleChange} />

        <input name="email" placeholder="Email" onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
        </select>

        <button onClick={handleSignup}>Signup</button>

        <p className="switchText">
          Already have an account? <span onClick={onSwitch}>Login</span>
        </p>
      </div>
    </div>
  );
}
