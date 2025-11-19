// src/pages/admin/ServicesPage.js
import React, { useEffect, useState } from "react";
import { getServices, createService, deleteService } from "../../api";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data.data); // FIXED
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(form);
    setForm({ title: "", description: "" });
    loadServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await deleteService(id);
    loadServices();
  };

  return (
    <>
      <h1 className="admin-title">Services Management</h1>

      <div className="admin-section">
        <h2>Services List</h2>

        {services.length === 0 ? (
          <p>No services yet.</p>
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
              {services.map((s) => (
                <tr key={s._id}>
                  <td>{s.title}</td>
                  <td>{s.description}</td>
                  <td>
                    <button onClick={() => handleDelete(s._id)} className="btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-section">
        <h2>Add New Service</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

          <button className="btn-primary">Add Service</button>
        </form>
      </div>
    </>
  );
};

export default ServicesPage;
