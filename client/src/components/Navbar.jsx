export default function Navbar({ user, onLogout }) {
    return (
      <nav className="navbar">
        <h2 className="logo">RoomMateIndia</h2>
  
        <div className="navRight">
          <span className="welcome">Hi, {user.name}</span>
          <button className="navBtn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    );
  }
  