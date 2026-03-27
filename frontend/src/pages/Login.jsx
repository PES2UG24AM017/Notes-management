import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handle() {
    try {
      const data = await loginUser({ email, password });
      // loginUser returns token + user
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Welcome Back</h1>
      <input className="auth-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="auth-input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="auth-btn" onClick={handle}>Login</button>
      <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
