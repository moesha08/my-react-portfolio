import React from "react";
import AdminNav from "./AdminNav";
import "./admin.css";

function DashboardLayout({ title, children }) {
  return (
    <div className="admin-wrapper">
      <AdminNav />

      <div className="admin-content">
        <h1 className="admin-title">{title}</h1>
        <div className="admin-card">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
