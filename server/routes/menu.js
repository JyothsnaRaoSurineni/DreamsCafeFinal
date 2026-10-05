import express from 'express';
import { getDB, saveDB } from '../db/db.js';

const router = express.Router();

// GET menu items with optional category and search filters
router.get('/', (req, res) => {
  const db = getDB();
  let items = db.menu;
  const { category, diet, search } = req.query;

  if (category && category !== 'All') {
    items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }

  if (diet && diet !== 'All') {
    items = items.filter(i => i.diet.toLowerCase() === diet.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    items = items.filter(i => 
      i.name.toLowerCase().includes(query) || 
      i.description.toLowerCase().includes(query)
    );
  }

  res.json(items);
});

// POST add new menu item (Admin)
router.post('/', (req, res) => {
  const db = getDB();
  const newItem = {
    id: `m-${Date.now()}`,
    name: req.body.name || 'New Gourmet Dish',
    category: req.body.category || 'Starters',
    price: Number(req.body.price) || 500,
    description: req.body.description || 'Delicious contemporary Indian creation.',
    diet: req.body.diet || 'Veg',
    spicyLevel: Number(req.body.spicyLevel) || 1,
    isChefSpecial: Boolean(req.body.isChefSpecial),
    image: req.body.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    rating: 5.0
  };

  db.menu.unshift(newItem);
  saveDB(db);
  res.status(201).json(newItem);
});

// PUT update menu item
router.put('/:id', (req, res) => {
  const db = getDB();
  const index = db.menu.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  db.menu[index] = { ...db.menu[index], ...req.body };
  saveDB(db);
  res.json(db.menu[index]);
});

// DELETE menu item
router.delete('/:id', (req, res) => {
  const db = getDB();
  const initialLen = db.menu.length;
  db.menu = db.menu.filter(i => i.id !== req.params.id);
  if (db.menu.length === initialLen) return res.status(404).json({ error: 'Item not found' });
  saveDB(db);
  res.json({ message: 'Menu item deleted successfully' });
});

export default router;
