import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to Notes</h1>
      <p className="home-tagline">Colorful notes, fast to use.</p>
      <div className="home-buttons">
        <Link to="/create" className="home-btn">Create Note</Link>
        <Link to="/all-notes" className="home-btn">All Notes</Link>
      </div>
    </div>
  );
}