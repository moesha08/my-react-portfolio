import React, { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "../../api";
import DashboardLayout from "./DashboardLayout";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(form);
    setForm({ title: "", description: "" });
    loadProjects();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await deleteProject(id);
    loadProjects();
  };

  return (
    <DashboardLayout title="Project Management">
      {/* LIST */}
      <div className="admin-card">
        <h2>Existing Projects</h2>

        {projects.length === 0 ? (
          <p className="empty-message">No projects found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CREATE NEW */}
      <div className="admin-card">
        <h2>Add New Project</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>

          <button className="btn btn-primary">Add Project</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
