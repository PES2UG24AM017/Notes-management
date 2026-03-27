import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="page-container">
      <h1 className="page-title">Profile</h1>
      <div className="profile-card">
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
