# Notes Management App

A full-stack notes application built with React, Node.js, Express, and MongoDB. Users can register, log in, and manage their personal notes.

## Tech Stack

- **Frontend** — React 19, React Router v6
- **Backend** — Node.js, Express
- **Database** — MongoDB (Mongoose)
- **Auth** — JWT (JSON Web Tokens) + bcryptjs

## Project Structure

```
├── backend/
│   ├── middleware/       # JWT auth middleware
│   ├── models/           # Mongoose models (User, Note)
│   ├── routes/           # Express routes (auth, notes)
│   ├── .env              # Environment variables
│   └── server.js         # Entry point
└── frontend/
    ├── public/
    └── src/
        ├── components/   # Navbar, NoteCard, ProtectedRoute
        ├── context/      # AuthContext (global auth state)
        ├── pages/        # All page components
        └── api.js        # Centralized API helper
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notesdb
JWT_SECRET=your_secret_key_here
```

Start the backend:

```bash
npm start
```

Runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:3000`

## Features

- User registration and login
- JWT-based authentication with protected routes
- Create, view, edit, and delete notes
- Notes are private per user
- Persistent login via localStorage

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/auth/me` | Get current user info |

### Notes (all require Authorization header)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes for logged-in user |
| GET | `/api/notes/:id` | Get a single note |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Troubleshooting

**"Token invalid" error** — Clear `token` and `user` from localStorage (DevTools → Application → Local Storage) and log in again.

**"react-scripts not recognized"** — Run `npm install` inside the `frontend` folder before `npm start`.

**Backend not connecting** — Make sure MongoDB is running and `MONGO_URI` in `.env` is correct.
