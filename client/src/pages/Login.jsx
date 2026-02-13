import axios from "axios";
import { useState } from "react";

export default function Login({ onLogin }) {
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
      alert("Login Failed ❌ Check Email or Password");
    }
  }

  return (
    <div className="loginWrapper">
      {/* LEFT SIDE INFO */}
      <div className="loginInfo">
        <h1>🏠 RoomMate India</h1>
        <p className="tagline">
          Find verified shared rooms & roommates across India 🌿
        </p>

        <div className="featureBox">
          <h3>🚀 Premium Features</h3>

          <ul>
            <li>
              ✅ <b>Real Database Chat Storage</b> <br />
              Messages are saved securely — no chat loss.
            </li>

            <li>
              ✅ <b>Upload Room Images</b> <br />
              Owners can upload real photos instead of random URLs.
            </li>

            <li>
              ✅ <b>Private + Group Chat</b> <br />
              Talk directly with owners or join room groups.
            </li>

            <li>
              ✅ <b>Verified Listings</b> <br />
              Safe & trusted rooms for students & professionals.
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="loginCard">
        <h2>Login</h2>
        <p>Welcome back 👋</p>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login to Continue</button>
      </div>
    </div>
  );
}
