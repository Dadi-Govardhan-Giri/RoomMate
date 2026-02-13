import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  // Auto login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setUser(null);
  }, []);

  return (
    <>
      {!user ? (
        <Login onLogin={(userData) => setUser(userData)} />
      ) : (
        <Home user={user} />
      )}
    </>
  );
}

export default App;
