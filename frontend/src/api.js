export const BASE = 'http://localhost:5000/api';

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function apiFetch(path, method='GET', body=null, token=null) {
  const opts = { method, headers: authHeader(token) };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API error');
  }
  return res.status === 204 ? null : res.json();
}

export const fetchNotes = (token) => apiFetch('/notes', 'GET', null, token);
export const fetchNote = (id, token) => apiFetch(`/notes/${id}`, 'GET', null, token);
export const createNote = (data, token) => apiFetch('/notes', 'POST', data, token);
export const updateNote = (id, data, token) => apiFetch(`/notes/${id}`, 'PUT', data, token);
export const deleteNote = (id, token) => apiFetch(`/notes/${id}`, 'DELETE', null, token);

export const loginUser = (data) => apiFetch('/auth/login', 'POST', data);
export const registerUser = (data) => apiFetch('/auth/register', 'POST', data);
export const getMe = (token) => apiFetch('/auth/me', 'GET', null, token);
