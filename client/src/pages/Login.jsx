import { useState } from "react";
import axios from "axios";
import "./Auth.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      onLogin(res.data.user);
    } catch (err) {
      alert("Login Failed ❌ Check Email/Password");
    }
  }

  return (
    <div className="authContainer">
      <div className="authCard">
        <h1>🏠 RoomMate India</h1>
        <p className="tagline">
          Find verified shared rooms & roommates across India 🌿
        </p>

        <h2>Login</h2>
        <p className="welcome">Welcome back 👋</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login to Continue</button>

        <p className="bottomText">
          New user? <span className="linkText">Signup coming in Step 5</span>
        </p>
      </div>
    </div>
  );
}
