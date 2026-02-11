import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  async function handleLogin() {
    const res = await axios.post("http://localhost:4000/api/auth/login", {
      email,
    });

    localStorage.setItem("token", res.data.token);
    onLogin(res.data.user);
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Login to RoomMate India</h2>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
