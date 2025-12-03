import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

/* AUTH PAGES */
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

/* ADMIN PAGES (PROTECTED) */
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

          {/* AUTH ROUTES */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* ADMIN DEFAULT REDIRECT */}
          <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />

          {/* 🔐 PROTECTED ADMIN ROUTES */}
          <Route path="/admin/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
          <Route path="/admin/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
          <Route path="/admin/services" element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
          <Route path="/admin/contacts" element={<PrivateRoute><ContactsPage /></PrivateRoute>} />

        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
