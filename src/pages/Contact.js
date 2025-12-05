import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <h2 className="contact-title">Contact Me</h2>

      {/* CONTACT INFO */}
      <div className="contact-card">
        <p><strong>Name:</strong> Moesha Aurelle Emaleu Deutou</p>
        <p><strong>Email:</strong> <a href="mailto:moeshaaurelle0@gmail.com">moeshaaurelle0@gmail.com</a></p>
        <p><strong>Phone:</strong> 416-931-1637</p>
        <p><strong>Location:</strong> Scarborough, Ontario, Canada</p>
      </div>

      {/* CONTACT FORM */}
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          First Name
          <input type="text" placeholder="Enter first name" required />
        </label>

        <label>
          Last Name
          <input type="text" placeholder="Enter last name" required />
        </label>

        <label>
          Email
          <input type="email" placeholder="Enter email" required />
        </label>

        <label>
          Message
          <textarea placeholder="Write your message..." rows="5" required></textarea>
        </label>

        <button type="submit" className="contact-btn">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
