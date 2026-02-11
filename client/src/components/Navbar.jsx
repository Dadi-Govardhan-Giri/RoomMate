export default function Navbar({ user }) {
  return (
    <nav className="navbar">
      <h2 className="logo">RoomMateIndia</h2>

      <div className="navRight">
        <span className="welcome">Hi, {user}</span>
        <button className="navBtn">Logout</button>
      </div>
    </nav>
  );
}
