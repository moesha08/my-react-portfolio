import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending signup data:", formData);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup server response:", data);

      if (response.ok) {
        alert("Account created successfully! Redirecting to Sign In...");
        navigate("/signin"); // ✔ Correct redirect
      } else {
        alert(data.message || "Signup failed.");
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Create Account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
