import React, { useEffect, useState } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../api";
import DashboardLayout from "./DashboardLayout";
import "./ServicesPage.css";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null); // modal

  const loadServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data.data || []);
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(form);

    // FIX: RESET FORM CORRECTLY
    setForm({ title: "", description: "" });
    loadServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await deleteService(id);
    loadServices();
  };

  const handleEditSave = async () => {
    await updateService(editing._id, editing);
    setEditing(null);
    loadServices();
  };

  return (
    <DashboardLayout title="Service Management">
      <div className="services-wrapper">
        
        {/* SERVICE LIST */}
        <div className="services-card">
          <h2 className="section-title">Services</h2>

          {services.length === 0 ? (
            <p className="empty-message">No services available.</p>
          ) : (
            <table className="services-table">
              <thead>
                <tr>
                  <th className="col-name">Title</th>
                  <th className="col-desc">Description</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((s) => (
                  <tr key={s._id}>
                    {/* FIX: DISPLAY TITLE, NOT NAME */}
                    <td className="name-cell">{s.title}</td>

                    <td className="description-cell">{s.description}</td>

                    <td className="service-actions">
                      <button className="btn-edit" onClick={() => setEditing(s)}>
                        Edit
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(s._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ADD NEW SERVICE */}
        <div className="add-service-card">
          <h2 className="section-title">Add New Service</h2>

          <form className="service-form" onSubmit={handleSubmit}>
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

            <button className="btn-submit">Add Service</button>
          </form>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Service</h2>

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
              <button className="btn-submit" onClick={handleEditSave}>
                Save Changes
              </button>

              <button className="btn-cancel" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ServicesPage;
