import React, { useEffect, useState } from "react";
import { getServices, createService, deleteService } from "../../api";
import DashboardLayout from "./DashboardLayout";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const loadServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(form);
    setForm({ title: "", description: "" });
    loadServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete service?")) return;
    await deleteService(id);
    loadServices();
  };

  return (
    <DashboardLayout title="Service Management">
      {/* LIST */}
      <div className="admin-card">
        <h2>Existing Services</h2>

        {services.length === 0 ? (
          <p className="empty-message">No services available.</p>
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
                    <button
                      className="btn btn-danger"
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

      {/* ADD SERVICE */}
      <div className="admin-card">
        <h2>Add New Service</h2>

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

          <button className="btn btn-primary">Add Service</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
