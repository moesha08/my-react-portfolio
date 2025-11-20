import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../api";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      await createContact(form);

      setStatus({
        loading: false,
        success: "Thank you! Your message has been sent successfully.",
        error: "",
      });

      // Clear form
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });

      // Optional redirect
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Error sending contact:", err);
      setStatus({
        loading: false,
        success: "",
        error: "Sorry, something went wrong. Please try again.",
      });
    }
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

      {/* STATUS MESSAGES */}
      {status.success && (
        <p className="contact-success">{status.success}</p>
      )}
      {status.error && (
        <p className="contact-error">{status.error}</p>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          name="lastname"
          value={form.lastname}
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

        <button
          type="submit"
          className="btn primary-btn"
          disabled={status.loading}
        >
          {status.loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
