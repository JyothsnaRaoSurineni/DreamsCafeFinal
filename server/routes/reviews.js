import express from 'express';
import { getDB, saveDB } from '../db/db.js';

const router = express.Router();

// GET all reviews
router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.reviews);
});

// POST submit review
router.post('/', (req, res) => {
  const db = getDB();
  const { author, rating, comment, location } = req.body;

  if (!author || !comment) {
    return res.status(400).json({ error: 'Name and comment are required.' });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    author,
    rating: Number(rating) || 5,
    date: 'Just now',
    location: location || 'Jubilee Hills Flagship',
    comment,
    avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&q=80`
  };

  db.reviews.unshift(newReview);
  saveDB(db);
  res.status(201).json(newReview);
});

export default router;
