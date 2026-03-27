const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// Get all notes for user
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
});

// Get single note
router.get('/:id', auth, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ msg: 'Note not found' });
  if (note.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });
  res.json(note);
});

// Create note
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ user: req.user.id, title, content });
  await note.save();
  res.status(201).json(note);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ msg: 'Note not found' });
  if (note.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });

  note.title = title;
  note.content = content;
  await note.save();
  res.json(note);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ msg: 'Note not found' });
  if (note.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });

  //await note.remove();
  await note.deleteOne();
  res.json({ msg: 'Deleted' });
});

module.exports = router;