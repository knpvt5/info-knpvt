import { useContext, useState } from "react";
import { Link } from "react-router";
import "./header.css";
import { PopupContext } from "../contexts/popupContext";



export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const popupContext = useContext(PopupContext);

  const { popupMsg, setPopupMsg } = popupContext;

  setPopupMsg("Welcome to the Lottery App!");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-text">Lottery</span>
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/data" onClick={closeMenu}>
                Data
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {popupMsg && (
        <div className="popup-message">
          <span>{popupMsg}</span>
        </div>
      )}
    </header>
  );
};
