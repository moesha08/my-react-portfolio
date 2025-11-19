import React, { useEffect, useState } from "react";
import { getContacts, updateContact, deleteContact } from "../../api";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadContacts = async () => {
    try {
      const res = await getContacts();
      setContacts(res.data.data); // FIXED
    } catch (err) {
      alert("Could not load messages");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleChange = (e) =>
    setSelected({ ...selected, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await updateContact(selected._id, selected);
      setSelected(null);
      loadContacts();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <>
      <h1>Contact Messages</h1>

      <h2>Messages</h2>

      {contacts.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {contacts.map((c) => (
            <li key={c._id}>
              <strong>{c.name}</strong> — {c.email}
              <button onClick={() => setSelected(c)}>View</button>
              <button onClick={() => deleteContact(c._id).then(loadContacts)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Selected Message</h2>

      {selected ? (
        <>
          <input name="name" value={selected.name} onChange={handleChange} />
          <input name="email" value={selected.email} onChange={handleChange} />
          <textarea
            name="message"
            value={selected.message}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setSelected(null)}>Close</button>
        </>
      ) : (
        <p>Select a message from the left.</p>
      )}
    </>
  );
};

export default ContactsPage;
