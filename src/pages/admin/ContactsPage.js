import React, { useEffect, useState } from "react";
import {
  getContacts,
  updateContact,
  deleteContact,
} from "../../api";
import DashboardLayout from "./DashboardLayout";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await getContacts();
      setContacts(res.data.data || []);
    } catch (err) {
      console.error("Error:", err);
      setToast({ type: "error", message: "Unable to load contacts." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateContact(selected._id, selected);
      setToast({ type: "success", message: "Contact updated." });
      setSelected(null);
      loadContacts();
    } catch (err) {
      console.error("Update error:", err);
      setToast({ type: "error", message: "Unable to update contact." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      setLoading(true);
      await deleteContact(id);
      setToast({ type: "success", message: "Contact deleted." });
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selected && selected._id === id) setSelected(null);
    } catch (err) {
      console.error("Delete error:", err);
      setToast({ type: "error", message: "Unable to delete contact." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Delete ALL contacts? This cannot be undone.")) return;
    try {
      setLoading(true);
      // reuse deleteContact in a loop or create a deleteAll endpoint if you have one
      for (const c of contacts) {
        // best-effort delete
        try {
          await deleteContact(c._id);
        } catch (e) {
          console.error("Failed deleting contact", c._id, e);
        }
      }
      setContacts([]);
      setSelected(null);
      setToast({ type: "success", message: "All contacts deleted." });
    } catch (err) {
      console.error("Delete all error:", err);
      setToast({ type: "error", message: "Unable to delete all contacts." });
    } finally {
      setLoading(false);
    }
  };

  const closeToast = () => setToast({ type: "", message: "" });

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleString();
  };

  return (
    <DashboardLayout title="Contact Messages">
      {loading && (
        <div className="spinner">
          <div className="spinner-circle" />
        </div>
      )}

      <div className="contacts-container">
        {/* LEFT: TABLE */}
        <div className="admin-card">
          <div className="admin-header-row">
            <h2>All Contacts</h2>
            {contacts.length > 0 && (
              <button className="btn btn-danger" onClick={handleDeleteAll}>
                Delete All
              </button>
            )}
          </div>

          {contacts.length === 0 ? (
            <p className="empty-message">No contact messages yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td>{c.firstname}</td>
                    <td>{c.lastname}</td>
                    <td>{c.email}</td>
                    <td>
                      {c.message && c.message.length > 40
                        ? c.message.slice(0, 40) + "..."
                        : c.message}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
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

        {/* RIGHT: DETAIL / EDIT PANEL */}
        {selected && (
          <div className="admin-card">
            <h2>Contact Details</h2>

            <p>
              <strong>Received:</strong> {formatDate(selected.createdAt)}
            </p>

            <form className="admin-form" onSubmit={handleUpdate}>
              <label>Firstname</label>
              <input
                value={selected.firstname || ""}
                onChange={(e) =>
                  setSelected({ ...selected, firstname: e.target.value })
                }
              />

              <label>Lastname</label>
              <input
                value={selected.lastname || ""}
                onChange={(e) =>
                  setSelected({ ...selected, lastname: e.target.value })
                }
              />

              <label>Email</label>
              <input
                value={selected.email || ""}
                onChange={(e) =>
                  setSelected({ ...selected, email: e.target.value })
                }
              />

              <label>Phone</label>
              <input
                value={selected.phone || ""}
                onChange={(e) =>
                  setSelected({ ...selected, phone: e.target.value })
                }
              />

              <label>Message</label>
              <textarea
                value={selected.message || ""}
                onChange={(e) =>
                  setSelected({ ...selected, message: e.target.value })
                }
                rows={4}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>

                {selected.email && (
                  <a
                    className="btn btn-secondary"
                    href={`mailto:${selected.email}?subject=Reply%20to%20your%20message`}
                  >
                    Reply by Email
                  </a>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Simple toast */}
      {toast.message && (
        <div
          className={`toast ${
            toast.type === "error" ? "toast-error" : "toast-success"
          }`}
        >
          <span>{toast.message}</span>
          <button className="toast-close" onClick={closeToast}>
            ×
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ContactsPage;
