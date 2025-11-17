import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Custom Logo */}
        <Link to="/" className="logo">
          <span className="logo-box">MD</span>
          <span className="logo-title">Moesha Deutou</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                to={page.path}
                className={isActive(page.path) ? "active" : ""}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mobile-nav">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className={isActive(page.path) ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              {page.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
