// src/pages/admin/AdminNav.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./admin.css";

const AdminNav = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>

        <nav className="admin-menu">
          <Link to="/admin/users" className={isActive("/admin/users") ? "active" : ""}>
            Users
          </Link>
          <Link to="/admin/projects" className={isActive("/admin/projects") ? "active" : ""}>
            Projects
          </Link>
          <Link to="/admin/services" className={isActive("/admin/services") ? "active" : ""}>
            Services
          </Link>
          <Link to="/admin/contacts" className={isActive("/admin/contacts") ? "active" : ""}>
            Contacts
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        {children}
      </main>

    </div>
  );
};

export default AdminNav;
