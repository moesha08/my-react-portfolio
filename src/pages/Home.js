import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="home-container">
      <motion.div
        className="home-box"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="home-title">Welcome to My Portfolio</h1>

        <p className="home-subtitle">
          I'm <strong>Moesha Deutou</strong>, a Software Engineering Technician student 
          passionate about web development, databases, and cloud technologies.
          I love building beautiful and functional applications.
        </p>

        <div className="home-buttons">
          <Link to="/about" className="btn primary-btn">
            Learn More About Me
          </Link>

          <Link to="/projects" className="btn outline-btn">
            View My Projects
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
