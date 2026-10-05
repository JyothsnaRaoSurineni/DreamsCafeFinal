import express from 'express';
import { getDB, saveDB } from '../db/db.js';

const router = express.Router();

// GET all reservations (Admin/Staff view)
router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.reservations);
});

// POST create reservation
router.post('/', (req, res) => {
  const db = getDB();
  const { locationId, guestName, email, phone, guests, date, time, seating, occasion, specialRequests } = req.body;

  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

  if (!guestName || !cleanPhone || !date || !time) {
    return res.status(400).json({ error: 'Please provide guest name, phone, date, and time.' });
  }

  if (cleanPhone.length !== 10) {
    return res.status(400).json({ error: 'Phone number must be exactly 10 digits.' });
  }

  const loc = db.locations.find(l => l.id === locationId) || db.locations[0];

  const newReservation = {
    id: `DRM-${Math.floor(10000 + Math.random() * 90000)}`,
    locationId: loc.id,
    locationName: loc.name,
    guestName,
    email: email || '',
    phone: cleanPhone,
    guests: Number(guests) || 2,
    date,
    time,
    seating: seating || 'Indoor Fine Dining',
    occasion: occasion || 'Casual Dining',
    specialRequests: specialRequests || 'None',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  db.reservations.unshift(newReservation);
  saveDB(db);
  res.status(201).json(newReservation);
});

// PATCH update status (Admin action)
router.patch('/:id/status', (req, res) => {
  const db = getDB();
  const resv = db.reservations.find(r => r.id === req.params.id);
  if (!resv) return res.status(404).json({ error: 'Reservation not found' });

  resv.status = req.body.status || resv.status;
  saveDB(db);
  res.json(resv);
});

export default router;
