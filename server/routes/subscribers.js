import express from 'express';
import { getDB, saveDB } from '../db/db.js';

const router = express.Router();

// GET all VIP private invitation subscribers
router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.subscribers || []);
});

// POST new subscriber
router.post('/', (req, res) => {
  const db = getDB();
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  if (!db.subscribers) db.subscribers = [];

  // Check if already subscribed
  const existing = db.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(200).json({ message: 'Email is already on the VIP private invitation list.', subscriber: existing });
  }

  const newSub = {
    id: `sub-${Date.now()}`,
    email: email.trim().toLowerCase(),
    createdAt: new Date().toISOString()
  };

  db.subscribers.unshift(newSub);
  saveDB(db);
  res.status(201).json(newSub);
});

export default router;
