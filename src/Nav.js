import { Link } from 'react-router-dom';

function NavBar() {
  return (
      <nav className="navbar">
        <h1>IS QR Code vault Project</h1>
        <div className="links">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
            <Link to="/logout">Log Out</Link>
        </div>
      </nav>
  );
}

export default NavBar;
