// src/pages/admin/UsersPage.js
import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../../api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  // Load all users from backend
  const loadUsers = async () => {
    try {
      const res = await getUsers();

      // The API response structure is:
      // { success: true, count: X, data: [...] }
      const realUsers = res.data.data || [];

      setUsers(realUsers);
    } catch (err) {
      console.error("Error loading users", err);
      alert("Unable to load users from backend.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Create new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstname || !form.lastname || !form.email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await createUser(form);

      setForm({ firstname: "", lastname: "", email: "" });

      loadUsers(); // reload updated list
    } catch (err) {
      console.error("Create user failed", err);
      alert("Unable to create user.");
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete user failed:", err);
      alert("Unable to delete user.");
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>User Management</h1>
      </div>

      <div className="admin-grid">
        {/* LEFT – USERS LIST */}
        <div className="admin-card">
          <span className="admin-pill">Registered Portal Users</span>

          {(!users || users.length === 0) ? (
            <p>No users available.</p>
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

        {/* RIGHT – ADD USER FORM */}
        <div className="admin-card">
          <h2>Add New User</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Firstname
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Enter firstname"
              />
            </label>

            <label>
              Lastname
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Enter lastname"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
