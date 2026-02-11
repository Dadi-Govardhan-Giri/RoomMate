import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Login to RoomMate India</h2>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={() => onLogin(email)}>Login</button>
      </div>
    </div>
  );
}
