import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <Home user={user} />
      ) : (
        <Login onLogin={(email) => setUser({ email })} />
      )}
    </>
  );
}
