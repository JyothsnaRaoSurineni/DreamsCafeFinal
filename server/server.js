import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import menuRoutes from './routes/menu.js';
import reservationsRoutes from './routes/reservations.js';
import ordersRoutes from './routes/orders.js';
import reviewsRoutes from './routes/reviews.js';
import locationsRoutes from './routes/locations.js';
import analyticsRoutes from './routes/analytics.js';
import subscribersRoutes from './routes/subscribers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/subscribers', subscribersRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', restaurant: 'Dreams Kitchen API Service', timestamp: new Date().toISOString() });
});

// Serve static frontend assets in production if dist directory exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.listen(PORT, () => {
  console.log(`✨ Dreams Kitchen Backend Server listening on http://localhost:${PORT}`);
});
