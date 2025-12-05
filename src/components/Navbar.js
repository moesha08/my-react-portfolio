import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("portfolio_token");

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("portfolio_token");
    window.location.href = "/signin";
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span className="logo-box">MD</span>
          <span className="logo-title">Moesha Deutou</span>
        </Link>

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

          {!token && (
            <li><Link to="/signin" className="signin-btn">Sign In</Link></li>
          )}

          {token && (
            <>
              <li><Link to="/admin/projects" className="admin-btn">Admin</Link></li>
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>

        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="mobile-nav">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              onClick={() => setIsOpen(false)}
              className={isActive(page.path) ? "active" : ""}
            >
              {page.name}
            </Link>
          ))}

          {!token && (
            <Link to="/signin" onClick={() => setIsOpen(false)}>Sign In</Link>
          )}

          {token && (
            <>
              <Link to="/admin/projects" onClick={() => setIsOpen(false)}>Admin</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
