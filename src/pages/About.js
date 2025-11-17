import React from "react";
import "./About.css";

const About = () => {
  const profileUrl = "/profile.jpg";
  const resumeUrl = "/Resume.pdf";

  return (
    <section className="about-container">
      <h2 className="about-title">About Me</h2>

      <img src={profileUrl} alt="Moesha Aurelle" className="about-photo" />

      <p className="about-text">
        My name is <strong>Moesha Aurelle Emaleu Deutou</strong>. I am a Software
        Engineering student at Centennial College in Toronto, Canada.
        Passionate about web development, cloud technologies, logistics systems,
        and database design.
      </p>

      <p className="about-text">
        I enjoy building modern applications with clean UI, strong functionality,
        and a unique touch of creativity.
      </p>

      <a
        href={resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="btn primary-btn about-btn"
      >
        View My Resume (PDF)
      </a>
    </section>
  );
};

export default About;
