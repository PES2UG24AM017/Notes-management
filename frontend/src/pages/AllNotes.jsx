import React, { useEffect, useState, useContext } from 'react';
import { fetchNotes } from '../api';
import { AuthContext } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import { Link } from 'react-router-dom';

export default function AllNotes() {
  const { token } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchNotes(token);
        setNotes(data);
      } catch (err) {
        alert('Could not load notes: ' + err.message);
      }
    })();
  }, [token]);

  const handleDelete = (id) => setNotes(prev => prev.filter(n => n._id !== id));

  return (
    <div className="page-container">
      <h1 className="page-title">All Notes</h1>
      {notes.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.6 }}>No notes yet. Create one!</p>
      ) : (
        <div className="notes-grid">
          {notes.map(n => <NoteCard key={n._id} note={n} onDelete={handleDelete} />)}
        </div>
      )}
      <Link to="/create" className="floating-btn">+</Link>
    </div>
  );
}
