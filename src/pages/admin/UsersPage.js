// src/pages/admin/UsersPage.js
import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../api";
import DashboardLayout from "./DashboardLayout";
import "./UsersPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [editing, setEditing] = useState(null); // popup modal
  const [loadingCreate, setLoadingCreate] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Error loading users:", err);
      alert("Unable to load users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.firstname || !form.lastname || !form.email) {
      alert("Please fill all fields.");
      return;
    }

    setLoadingCreate(true);
    try {
      await createUser(form);
      setForm({ firstname: "", lastname: "", email: "" });
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Unable to create user.");
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    loadUsers();
  };

  const handleEditSave = async () => {
    await updateUser(editing._id, {
      firstname: editing.firstname,
      lastname: editing.lastname,
      email: editing.email,
    });

    setEditing(null);
    loadUsers();
  };

  return (
    <DashboardLayout title="User Management">
      <div className="users-wrapper">

        {/* USERS TABLE */}
        <div className="users-card">
          <h2 className="section-title">Registered Users</h2>

          {users.length === 0 ? (
            <p className="empty-message">No users found.</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.firstname}</td>
                    <td>{u.lastname}</td>
                    <td>{u.email}</td>

                    <td className="table-actions">
                      <button
                        className="btn-edit"
                        onClick={() => setEditing(u)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn-delete"
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

          {/* ADD NEW USER FORM */}
          <h3 className="form-title">Add New User</h3>

          <form className="user-form" onSubmit={handleCreate}>
            <label>Firstname</label>
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleCreateChange}
            />

            <label>Lastname</label>
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleCreateChange}
            />

            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleCreateChange}
            />

            <button className="btn-submit" disabled={loadingCreate}>
              {loadingCreate ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>
      </div>

      {/* EDIT POPUP MODAL */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit User</h2>

            <label>Firstname</label>
            <input
              value={editing.firstname}
              onChange={(e) =>
                setEditing({ ...editing, firstname: e.target.value })
              }
            />

            <label>Lastname</label>
            <input
              value={editing.lastname}
              onChange={(e) =>
                setEditing({ ...editing, lastname: e.target.value })
              }
            />

            <label>Email</label>
            <input
              type="email"
              value={editing.email}
              onChange={(e) =>
                setEditing({ ...editing, email: e.target.value })
              }
            />

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

export default UsersPage;
