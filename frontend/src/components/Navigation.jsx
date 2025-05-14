import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <a href="/">
        <img src={logo} alt="DevLink logo" className="logo" />
      </a>

      <ul className="nav-links">
        <li>
          <a href="/">Resources</a>
        </li>
        {user && (
          <li>
            <a href="/create">Create</a>
          </li>
        )}
        <li>
          <a href="/">Blog</a>
        </li>
        <li>
          <a href="https://github.com/statesjs">GitHub</a>
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
