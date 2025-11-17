import React, { useState } from "react";
import "./Projects.css";
import { motion } from "framer-motion";

const projects = [
  {
    title: "IFLDS – Intelligent Freight Logistics Dispatch System",
    image: "/images/iflds.png",
    description:
      "A logistics and dispatch planning system designed to optimize routes, manage shipments, and support decision-making.",
    files: [
      { label: "IFLDS DOCX", url: "/projects/iflds.docx" },
      { label: "IFLDS PPTX", url: "/projects/iflds.pptx" }
    ],
  },
  {
    title: "Personal Portfolio Website",
    image: "/images/portfolio.png",
    description:
      "A modern React portfolio site with a violet/fuchsia aesthetic created for COMP229.",
    files: [
      { label: "Backend ZIP", url: "/projects/my-portfolio-backend.zip" }
    ],
  },
  {
    title: "QuickStay – Hotel Management System",
    image: "/images/quickstay.png",
    description:
      "A hotel management system designed for guest reservations, room management, and administrative workflows.",
    files: [
      { label: "QuickStay DOCX", url: "/projects/quicstay-hms.docx" }
    ],
  },
  {
    title: "School LMS – Learning Management System",
    image: "/images/school lms.png",
    description:
      "A mock LMS system for managing schedules, assignments, user roles, and communication tools.",
    files: [],
  },
  {
    title: "HelpDesk TMS – Ticket Management System",
    image: "/images/TMS.png",
    description:
      "A MERN stack ticket management system including authentication, ticket creation, services, and project management.",
    files: [
      { label: "Agile Tracking PDF", url: "/projects/tms-agile-tracking.pdf" },
      { label: "Backend ZIP", url: "/projects/tms-backend.zip" },
      { label: "EDD PDF", url: "/projects/tms-edd.pdf" }
    ],
  },
];

const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="projects-page">
      <h2 className="projects-title">✨ My Projects ✨</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            className="project-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={project.image} alt={project.title} className="project-img" />

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <button className="project-btn" onClick={() => setSelected(project)}>
              View Project
            </button>
          </motion.div>
        ))}
      </div>

      {/* MODAL POP-UP */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.title}</h2>

            <img src={selected.image} alt="" className="modal-img" />

            <p className="modal-desc">{selected.description}</p>

            <h3 className="download-title">Project Files</h3>

            {selected.files.length > 0 ? (
              <ul className="file-list">
                {selected.files.map((file) => (
                  <li key={file.url}>
                    <a href={file.url} download target="_blank" rel="noreferrer">
                      📎 {file.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-files">No downloadable files for this project.</p>
            )}

            <button className="close-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
