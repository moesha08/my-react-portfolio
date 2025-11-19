import React, { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../../api";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data); // FIXED
    } catch (e) {
      alert("Could not load projects");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    try {
      await createProject(form);
      setForm({ title: "", description: "" });
      loadProjects();
    } catch {
      alert("Failed to add project");
    }
  };

  return (
    <>
      <h1>Projects Management</h1>

      <h2>Projects List</h2>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p._id}>
              {p.title} — {p.description}
              <button onClick={() => deleteProject(p._id).then(loadProjects)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Add New Project</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <button onClick={handleAdd}>Add Project</button>
    </>
  );
};

export default ProjectsPage;
