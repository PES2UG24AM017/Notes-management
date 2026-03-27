import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteNote } from "../api";
import { AuthContext } from "../context/AuthContext";

const NoteCard = ({ note, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { token } = useContext(AuthContext);

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;
    setIsDeleting(true);
    try {
      await deleteNote(note._id, token);
      if (onDelete) onDelete(note._id);
      else window.location.reload();
    } catch (err) {
      alert("Could not delete note: " + err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className={`note-card ${isDeleting ? "removing" : ""}`}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-excerpt">
        {note.content.substring(0, 120)}
        {note.content.length > 120 ? "…" : ""}
      </p>
      <div className="note-buttons">
        <Link to={`/view/${note._id}`} className="card-btn" aria-label={`View ${note.title}`}>View</Link>
        <Link to={`/edit/${note._id}`} className="btn edit-btn" aria-label={`Edit ${note.title}`}>Edit</Link>
        <button className="btn delete-btn" onClick={handleDelete} aria-label={`Delete ${note.title}`}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
