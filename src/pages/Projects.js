import React, { useState, memo } from "react";
import "./Projects.css";
import { motion } from "framer-motion";

/* ===========================
     PROJECT DATA  
   =========================== */
const projects = [
  {
    title: "IFLDS – Intelligent Freight Logistics Dispatch System",
    image: "/images/iflds.webp",
    width: 600,
    height: 400,
    alt: "IFLDS Logistics System",
    description:
      "A logistics and dispatch planning system designed to optimize routes, manage shipments, and support decision-making.",
    files: [
      { label: "IFLDS DOCX", url: "/projects/iflds.docx" },
      { label: "IFLDS PPTX", url: "/projects/iflds.pptx" }
    ],
  },
  {
    title: "Personal Portfolio Website",
    image: "/images/portfolio.webp",
    width: 600,
    height: 400,
    alt: "Portfolio Website Preview",
    description:
      "A modern React portfolio site with violet/fuchsia aesthetic created for COMP229.",
    files: [
      { label: "Backend ZIP", url: "/projects/my-portfolio-backend.zip" }
    ],
  },
  {
    title: "QuickStay – Hotel Management System",
    image: "/images/quickstay.webp",
    width: 600,
    height: 400,
    alt: "QuickStay Hotel Management System",
    description:
      "A hotel management system designed for guest reservations, room management, and administrative workflows.",
    files: [
      { label: "QuickStay DOCX", url: "/projects/quicstay-HMS.docx" }
    ],
  },
  {
    title: "School LMS – Learning Management System",
    image: "/images/school-lms.webp",
    width: 600,
    height: 400,
    alt: "School LMS System",
    description:
      "A mock LMS for managing schedules, assignments, user roles, and communication tools.",
    files: [],
  },
  {
    title: "HelpDesk TMS – Ticket Management System",
    image: "/images/TMS.webp",
    width: 600,
    height: 400,
    alt: "HelpDesk Ticket Management System",
    description:
      "A MERN ticket management system including authentication, ticket creation, services, and project management.",
    files: [
      { label: "Agile Tracking PDF", url: "/projects/tms-agile-tracking.pdf" },
      { label: "Backend ZIP", url: "/projects/tms-backend.zip" },
      { label: "EDD PDF", url: "/projects/tms-edd.pdf" }
    ],
  },
];

/* ===========================
     PROJECTS COMPONENT  
   =========================== */
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
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={project.image}
              alt={project.alt}
              className="project-img"
              width={project.width}
              height={project.height}
              loading="lazy"
              decoding="async"
            />

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <button
              className="project-btn"
              aria-label={`View details about ${project.title}`}
              onClick={() => setSelected(project)}
            >
              View Project
            </button>
          </motion.div>
        ))}
      </div>

      {/* ===========================
            MODAL POPUP
         =========================== */}
      {selected && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.title}</h2>

            <img
              src={selected.image}
              alt={selected.alt}
              className="modal-img"
              width={selected.width}
              height={selected.height}
              loading="lazy"
              decoding="async"
            />

            <p className="modal-desc">{selected.description}</p>

            <h3 className="download-title">📁 Project Files</h3>

            {selected.files?.length > 0 ? (
              <ul className="file-list">
                {selected.files.map((file) => (
                  <li key={file.url}>
                    <a
                      href={file.url}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      📎 {file.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-files">No downloadable files.</p>
            )}

            <button
              className="close-btn"
              aria-label="Close project details"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Projects);
