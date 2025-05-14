import { useState } from "react";
import "./Navigation.css";
import logo from "../assets/logo.png";
import light from "../assets/light.png";
import dark from "../assets/dark.png";

export default function Navigation() {
  const [isDark, setDark] = useState(false);

  const handleToggle = () => {
    setDark((prev) => !prev);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };
  return (
    <nav className={`nav-bar ${isDark ? "dark" : "light"}`}>
      <a href="/">
        <img src={logo} alt="DevLink logo" className="logo" />
      </a>

      <ul className="nav-links">
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Resources</a>
        </li>
        <li>
          <a href="/">Blog</a>
        </li>
        <li>
          <a href="/">GitHub</a>
        </li>
      </ul>

      <img
        src={isDark ? light : dark}
        alt="Toggler"
        className="toggle-icon"
        onClick={handleToggle}
      />
    </nav>
  );
}
