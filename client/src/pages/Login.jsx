import { useState } from "react";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue to RoomMate India</p>

        <input
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={() => onLogin(email)}>Login</button>

        <p className="switchText">
          New user? <span onClick={onSwitch}>Create Account</span>
        </p>
      </div>
    </div>
  );
}
