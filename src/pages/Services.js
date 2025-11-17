import React from "react";
import "./Services.css";
import { FaCheckCircle } from "react-icons/fa";

const Services = () => {
  return (
    <section className="services-container">
      <h2 className="services-title">💎 Services I Offer 💎</h2>

      <div className="services-grid">

        {/* Service 1 */}
        <div className="service-card">
          <FaCheckCircle className="service-icon" />
          <h3>Full-Stack Web Development</h3>
          <p>
            Building fast, modern, and responsive applications using React,
            Node.js, Express, and MongoDB.
          </p>
        </div>

        {/* Service 2 */}
        <div className="service-card">
          <FaCheckCircle className="service-icon" />
          <h3>REST API Development</h3>
          <p>
            Designing secure, scalable, and fully documented APIs for web and
            mobile applications.
          </p>
        </div>

        {/* Service 3 */}
        <div className="service-card">
          <FaCheckCircle className="service-icon" />
          <h3>Database Design & Query Optimization</h3>
          <p>
            Creating efficient schemas, writing advanced SQL/Mongo queries,
            and improving database performance.
          </p>
        </div>

        {/* Service 4 */}
        <div className="service-card">
          <FaCheckCircle className="service-icon" />
          <h3>Cloud Deployment</h3>
          <p>
            Deploying full-stack apps on Vercel, Render, and GitHub with
            professional CI/CD pipelines.
          </p>
        </div>

        {/* Service 5 */}
        <div className="service-card">
          <FaCheckCircle className="service-icon" />
          <h3>UI/UX Portfolio & Application Design</h3>
          <p>
            Designing modern, professional interfaces.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
