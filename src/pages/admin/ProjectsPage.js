import React, { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api";
import DashboardLayout from "./DashboardLayout";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null); // modal control
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("Error loading projects:", err);
      alert("Unable to load projects.");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoadingCreate(true);
    try {
      await createProject({
        title: form.title,
        description: form.description,
        technologies: [],
      });

      setForm({ title: "", description: "" });
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Unable to create project.");
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleEditSave = async () => {
    if (!editing) return;

    setLoadingUpdate(true);
    try {
      await updateProject(editing._id, {
        title: editing.title,
        description: editing.description,
      });

      alert("Project updated successfully.");
      setEditing(null);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Unable to update project.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const confirmDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteProject(id);
      loadProjects();
    }
  };

  return (
    <DashboardLayout title="Project Management">
      <div className="projects-wrapper">
        
        {/* PROJECT LIST */}
        <div className="projects-card">
          <h2 className="section-title">Projects</h2>

          {projects.length === 0 ? (
            <p className="empty-message">No projects found.</p>
          ) : (
            <table className="projects-table">
              <thead>
                <tr>
                  <th className="col-title">Title</th>
                  <th className="col-desc">Description</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((p) => (
                  <tr key={p._id}>
                    <td>{p.title}</td>
                    <td>{p.description}</td>
                    <td>
                      <div className="project-actions">
                        <button
                          className="btn-edit"
                          onClick={() => setEditing(p)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() => confirmDelete(p._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ADD NEW PROJECT */}
        <div className="add-project-card">
          <h2 className="section-title">Add New Project</h2>

          <form className="project-form" onSubmit={handleCreate}>
            <label>Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            ></textarea>

            <button className="btn-submit" disabled={loadingCreate}>
              {loadingCreate ? "Adding..." : "Add Project"}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL POPUP */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit Project</h2>

            <label>Title</label>
            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
            />

            <label>Description</label>
            <textarea
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
            ></textarea>

            <div className="modal-actions">
              <button
                className="btn-submit"
                onClick={handleEditSave}
                disabled={loadingUpdate}
              >
                {loadingUpdate ? "Saving..." : "Save Changes"}
              </button>

              <button
                className="btn-cancel"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProjectsPage;
