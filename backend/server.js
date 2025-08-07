// server.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const updateOrderProgress = require('./jobs/orderProgressUpdater');
const contactRoutes = require('./routes/contact');

// Verify environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGO_URI ? 'Loaded' : 'Missing');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route loading with better error handling
const loadRoutes = () => {
  try {
    // Auth routes
    const authRoutes = require('./routes/auth');
    app.use('/api/v1/auth', authRoutes);

    // Other routes
    const dashboardRoutes = require('./routes/dashboard');
    const orderRoutes = require('./routes/orders');
    const cartRoutes = require('./routes/cart');
    const productRoutes = require('./routes/product');
    const updateOrderProgress = require('./jobs/orderProgressUpdater');
    
    app.use('/api/v1/dashboard', dashboardRoutes);
    app.use('/api/v1/orders', orderRoutes);
    app.use('/api/v1/cart', cartRoutes);
    app.use('/api/v1/products', productRoutes);
    app.use('/api/v1/contact', contactRoutes);

    console.log('All routes loaded successfully');
  } catch (err) {
    console.error('Route loading error:', err);
    process.exit(1);
  }
};

// Load routes
loadRoutes();

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setInterval(() => {
  updateOrderProgress().catch(err => console.error('Progress update error:', err));
}, 60000); 

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});