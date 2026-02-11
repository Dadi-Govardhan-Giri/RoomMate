import axios from "axios";
import { useState } from "react";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      alert("Login Failed ❌ Check email/password");
    }
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Login to RoomMate India</h2>

        {/* Email */}
        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button onClick={handleLogin}>Login</button>

        {/* Switch */}
        <p style={{ marginTop: "15px" }}>
          New user?{" "}
          <span
            onClick={onSwitch}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
}
