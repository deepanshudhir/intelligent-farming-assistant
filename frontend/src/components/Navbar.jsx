
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        🌱 Farm<span>Assist</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
          Home
        </NavLink>

        {token ? (
          <>
            <NavLink to="/dashboard" className={navLinkClass} onClick={closeMenu}>
              Dashboard
            </NavLink>

            <NavLink
              to="/disease-detection"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Disease Detection
            </NavLink>

            <NavLink to="/weather" className={navLinkClass} onClick={closeMenu}>
              Weather
            </NavLink>

            <NavLink to="/history" className={navLinkClass} onClick={closeMenu}>
              History
            </NavLink>

            <NavLink to="/chatbot" className={navLinkClass} onClick={closeMenu}>
              AI Chatbot
            </NavLink>

            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
              Login
            </NavLink>

            <Link
              to="/register"
              className="navbar-register"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
