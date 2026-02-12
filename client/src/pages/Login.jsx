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
      alert(err.response.data.message);
    }
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          New user?{" "}
          <span onClick={onSwitch} style={{ color: "blue" }}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
