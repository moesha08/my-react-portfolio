import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://portfolio-backend-edky.onrender.com/api/auth/signin",
        { email, password }
      );

      alert("Sign In Successful!");

      // Save token with correct key used by axios interceptor
      localStorage.setItem("portfolio_token", res.data.token);

      // Redirect to admin dashboard
      window.location.href = "/admin/projects";

    } catch (error) {
      console.error(error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="signin-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="signin-btn" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
