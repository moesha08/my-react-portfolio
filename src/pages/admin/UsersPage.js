import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../../api";
import DashboardLayout from "./DashboardLayout";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Unable to load users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(form);
      setForm({ firstname: "", lastname: "", email: "", password: "" });
      loadUsers();
    } catch (err) {
      alert("Unable to create user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch {
      alert("Unable to delete user.");
    }
  };

  return (
    <DashboardLayout title="User Management">
      <div className="admin-grid">

        {/* LEFT — USER LIST */}
        <div className="admin-card">
          <span className="admin-pill">Registered Users</span>

          {users.length === 0 ? (
            <p className="empty-message">No users found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.firstname}</td>
                    <td>{u.lastname}</td>
                    <td>{u.email}</td>
                    <td className="admin-actions">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(u._id)}
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

        {/* RIGHT — ADD USER */}
        <div className="admin-card">
          <h2>Add New User</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <label>Firstname</label>
            <input
              name="firstname"
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            />

            <label>Lastname</label>
            <input
              name="lastname"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            />

            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="btn btn-primary">Add User</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
