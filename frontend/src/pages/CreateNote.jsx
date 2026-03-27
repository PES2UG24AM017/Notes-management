import React, { useState, useContext } from 'react';
import { createNote } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreateNote() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '' });

  async function handle() {
    try {
      await createNote(note, token);
      navigate('/all-notes');
    } catch (err) {
      alert('Create failed: ' + err.message);
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Create Note</h1>
      <div className="form-card">
        <input className="auth-input" placeholder="Title" value={note.title} onChange={e=>setNote({...note, title: e.target.value})} />
        <textarea className="auth-input" rows="6" placeholder="Content" value={note.content} onChange={e=>setNote({...note, content: e.target.value})} />
        <button className="auth-btn" onClick={handle}>Save</button>
      </div>
    </div>
  );
}
