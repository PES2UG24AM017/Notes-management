import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchNote, deleteNote } from "../api";
import { AuthContext } from "../context/AuthContext";

const ViewNote = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchNote(id, token);
        setNote(data);
      } catch (err) {
        alert("Failed to load note: " + err.message);
      }
    })();
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(id, token);
      navigate("/all-notes");
    } catch (err) {
      alert("Could not delete note: " + err.message);
    }
  };

  if (!note)
    return (
      <h2 style={{ color: "white", textAlign: "center", marginTop: "90px" }}>
        Loading...
      </h2>
    );

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="note-view-card">
        <h1>{note.title}</h1>
        <p style={{ marginTop: "12px" }}>{note.content}</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
          <Link to={`/edit/${id}`} className="card-btn">Edit</Link>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
