import React, { useEffect, useState } from "react";
import { getContacts, deleteContact, updateContact } from "../../api";
import DashboardLayout from "./DashboardLayout";
import "./ContactsPage.css";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadContacts = async () => {
    try {
      const res = await getContacts();
      setContacts(res.data.data || []);
    } catch {
      alert("Failed to load contacts");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact message?")) return;

    try {
      await deleteContact(id);
      setContacts(contacts.filter((c) => c._id !== id));
      setSelected(null);
    } catch {
      alert("Could not delete contact.");
    }
  };

  const handleSave = async () => {
    try {
      await updateContact(selected._id, selected);
      alert("Changes saved.");
      loadContacts();
    } catch {
      alert("Unable to save changes.");
    }
  };

  return (
    <DashboardLayout title="Contact Messages">
      <div className="admin-container">

        {/* CONTACT LIST CARD */}
        <div className="card">
          <div className="card-header">
            <h2>All Contacts</h2>
          </div>

          {contacts.length === 0 ? (
            <p className="empty">No messages found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td>{c.firstname}</td>
                    <td>{c.lastname}</td>
                    <td>{c.email}</td>
                    <td>{c.message.slice(0, 30)}...</td>
                    <td className="action-col">
                      <button className="btn-view" onClick={() => setSelected(c)}>
                        View
                      </button>
                      <button
                        className="btn-delete"
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

        {/* CONTACT DETAILS */}
        {selected && (
          <div className="card details-card">
            <h2>Contact Details</h2>

            <label>Firstname</label>
            <input
              value={selected.firstname}
              onChange={(e) => setSelected({ ...selected, firstname: e.target.value })}
            />

            <label>Lastname</label>
            <input
              value={selected.lastname}
              onChange={(e) => setSelected({ ...selected, lastname: e.target.value })}
            />

            <label>Email</label>
            <input
              value={selected.email}
              onChange={(e) => setSelected({ ...selected, email: e.target.value })}
            />

            <label>Phone</label>
            <input
              value={selected.phone}
              onChange={(e) => setSelected({ ...selected, phone: e.target.value })}
            />

            <label>Message</label>
            <textarea
              rows={5}
              value={selected.message}
              onChange={(e) => setSelected({ ...selected, message: e.target.value })}
            />

            <div className="btn-row">
              <button className="btn-save" onClick={handleSave}>
                Save Changes
              </button>

              <a
                className="btn-email"
                href={`mailto:${selected.email}?subject=Reply from Admin&body=${selected.message}`}
              >
                Reply by Email
              </a>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ContactsPage;
