import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// ADMIN PAGES
import UsersPage from "./pages/admin/UsersPage";
import ProjectsPage from "./pages/admin/ProjectsPage";
import ServicesPage from "./pages/admin/ServicesPage";
import ContactsPage from "./pages/admin/ContactsPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <main className="main-content">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* ADMIN REDIRECT */}
          <Route path="/admin" element={<Navigate to="/admin/users" />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/projects" element={<ProjectsPage />} />
          <Route path="/admin/services" element={<ServicesPage />} />
          <Route path="/admin/contacts" element={<ContactsPage />} />

        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
