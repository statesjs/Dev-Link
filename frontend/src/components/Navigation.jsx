import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navigation.css";
import logo from "../assets/logo.png";
import light from "../assets/light.png";
import dark from "../assets/dark.png";

export default function Navigation() {
  const [isDark, setDark] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleToggle = () => {
    setDark((prev) => !prev);
    document.body.classList.toggle("dark-mode", !isDark);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`nav-bar ${isDark ? "dark" : "light"}`}>
      <Link to="/">
        <img src={logo} alt="DevLink logo" className="logo" />
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/">Resources</Link>
        </li>
        {user && (
          <li>
            <Link to="/create">Create</Link>
          </li>
        )}
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <a
            href="https://github.com/statesjs"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>

      <div className="nav-auth">
        {user ? (
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        ) : (
          <>
            <button onClick={handleLoginClick} className="btn login-btn">
              Login
            </button>
            <button onClick={handleRegisterClick} className="btn register-btn">
              Register
            </button>
          </>
        )}
      </div>

      <img
        src={isDark ? light : dark}
        alt="Toggler"
        className="toggle-icon"
        onClick={handleToggle}
      />
    </nav>
  );
}
