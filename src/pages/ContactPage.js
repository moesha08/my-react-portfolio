import React, { useEffect, useState } from "react";
import { getContacts, updateContact, deleteContact } from "../../api";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadContacts = async () => {
    try {
      const res = await getContacts();

      // Backend returns:
      // { success: true, count: X, data: [...] }
      const array = Array.isArray(res.data.data) ? res.data.data : [];

      setContacts(array);
    } catch (err) {
      console.error("Error loading contacts", err);
      alert("Could not load contacts.");
      setContacts([]);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selected) return;

    try {
      await updateContact(selected._id, selected);
      alert("Contact updated!");
      setSelected(null);
      loadContacts();
    } catch (err) {
      console.error("Update failed", err);
      alert("Could not update contact.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));

      if (selected && selected._id === id) setSelected(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not delete contact.");
    }
  };

  return (
    <>
      <h1 className="admin-title">Contact Messages</h1>

      <div className="admin-grid">

        {/* LEFT SIDE – LIST */}
        <div className="admin-card">
          <h2>Messages</h2>

          {contacts.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>First</th>
                  <th>Last</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td>{c.firstname}</td>
                    <td>{c.lastname}</td>
                    <td>{c.email}</td>

                    <td className="actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => setSelected(c)}
                      >
                        View
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(c._id)}
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

        {/* RIGHT SIDE – SELECTED MESSAGE */}
        <div className="admin-card">
          <h2>Selected Message</h2>

          {!selected ? (
            <p>Select a message to view or edit.</p>
          ) : (
            <form className="admin-form" onSubmit={handleSave}>
              <label>
                Firstname
                <input
                  name="firstname"
                  value={selected.firstname}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Lastname
                <input
                  name="lastname"
                  value={selected.lastname}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  value={selected.email}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  value={selected.message}
                  onChange={handleEditChange}
                />
              </label>

              <div className="admin-buttons">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactsPage;
