import express from 'express';
import { getDB, saveDB } from '../db/db.js';

const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.orders);
});

// POST place order
router.post('/', (req, res) => {
  const db = getDB();
  const { customerName, email, phone, addressLine1, addressLine2, address, items, totalAmount, paymentMethod } = req.body;

  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

  if (!customerName || !cleanPhone || !items || items.length === 0) {
    return res.status(400).json({ error: 'Customer name, phone, and items are required.' });
  }

  if (cleanPhone.length !== 10) {
    return res.status(400).json({ error: 'Phone number must be exactly 10 digits.' });
  }

  const fullAddress = address || [addressLine1, addressLine2].filter(Boolean).join(', ');

  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    email: email || '',
    phone: cleanPhone,
    addressLine1: addressLine1 || '',
    addressLine2: addressLine2 || '',
    address: fullAddress || 'Dine-in Pick-up / Delivery',
    items,
    totalAmount: Number(totalAmount) || 0,
    paymentMethod: paymentMethod || 'Online Payment',
    status: 'Preparing',
    createdAt: new Date().toISOString()
  };

  db.orders.unshift(newOrder);
  saveDB(db);
  res.status(201).json(newOrder);
});

// PATCH update status (Admin action)
router.patch('/:id/status', (req, res) => {
  const db = getDB();
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = req.body.status || order.status;
  saveDB(db);
  res.json(order);
});

export default router;
