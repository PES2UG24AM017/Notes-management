import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  async function handle() {
    try {
      await registerUser(user);
      alert('Account created — please login');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Create Account</h1>
      <input className="auth-input" placeholder="Full name" value={user.name} onChange={e=>setUser({...user, name: e.target.value})} />
      <input className="auth-input" placeholder="Email" value={user.email} onChange={e=>setUser({...user, email: e.target.value})} />
      <input className="auth-input" type="password" placeholder="Password" value={user.password} onChange={e=>setUser({...user, password: e.target.value})} />
      <button className="auth-btn" onClick={handle}>Sign Up</button>
    </div>
  );
}
