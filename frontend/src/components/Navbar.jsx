import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="nav-inner container">
        <div className="brand">✨ Notes</div>

        <nav className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/all-notes">All Notes</NavLink>
          <NavLink to="/create">Create</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/help">Help</NavLink>
        </nav>

        <div className="auth">
          {token ? (
            <>
              <span className="user-name">{user?.name}</span>
              <button className="btn small" onClick={doLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
