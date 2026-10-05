import express from 'express';
import { getDB } from '../db/db.js';

const router = express.Router();

// GET dashboard analytics
router.get('/', (req, res) => {
  const db = getDB();

  const totalRevenue = db.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrders = db.orders.length;
  const totalReservations = db.reservations.length;
  const pendingReservations = db.reservations.filter(r => r.status === 'Pending').length;
  const activeMenuItems = db.menu.length;
  const totalSubscribers = (db.subscribers || []).length;

  const totalReviewRatings = db.reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = db.reviews.length > 0 ? (totalReviewRatings / db.reviews.length).toFixed(1) : '4.9';

  res.json({
    totalRevenue,
    totalOrders,
    totalReservations,
    pendingReservations,
    activeMenuItems,
    totalSubscribers,
    averageRating
  });
});

export default router;
