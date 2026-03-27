import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AllNotes from './pages/AllNotes';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import ViewNote from './pages/ViewNote';
import About from './pages/About';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: 90 }}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/all-notes" element={<ProtectedRoute><AllNotes /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
          <Route path="/note/:id" element={<ProtectedRoute><ViewNote /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view/:id" element={<ProtectedRoute><ViewNote /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}
