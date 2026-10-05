import express from 'express';
import { getDB } from '../db/db.js';

const router = express.Router();

// GET all locations
router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.locations);
});

// GET single location
router.get('/:id', (req, res) => {
  const db = getDB();
  const loc = db.locations.find(l => l.id === req.params.id);
  if (!loc) return res.status(404).json({ error: 'Location not found' });
  res.json(loc);
});

export default router;
