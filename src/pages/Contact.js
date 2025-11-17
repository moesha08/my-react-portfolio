import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Redirecting to Home page...");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => navigate("/"), 500);
  };

  return (
    <section className="contact">
      <h2>Contact Me</h2>

      <div className="contact-info">
        <p>
          <strong>Name:</strong> Moesha Aurelle Emaleu Deutou
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:moeshaaurelle0@gmail.com">
            moeshaaurelle0@gmail.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong> 416-931-1637
        </p>
        <p>
          <strong>Location:</strong> Scarborough, Ontario, Canada
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Phone (optional)</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <label>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn primary-btn">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
