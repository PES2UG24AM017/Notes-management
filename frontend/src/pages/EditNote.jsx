import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNote, updateNote } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function EditNote() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    (async()=> {
      try {
        const n = await fetchNote(id, token);
        setNote(n);
      } catch (err) {
        alert('Load failed: ' + err.message);
      }
    })();
  }, [id, token]);

  if (!note) return <div className="page-container"><p>Loading…</p></div>;

  async function handle() {
    try {
      await updateNote(id, note, token);
      navigate('/all-notes');
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Edit Note</h1>
      <div className="form-card">
        <input className="auth-input" value={note.title} onChange={e=>setNote({...note, title: e.target.value})} />
        <textarea className="auth-input" rows="6" value={note.content} onChange={e=>setNote({...note, content: e.target.value})} />
        <button className="auth-btn" onClick={handle}>Update</button>
      </div>
    </div>
  );
}
