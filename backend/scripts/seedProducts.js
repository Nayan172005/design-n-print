// scripts/seedProducts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

const sampleProducts = [
  // Business Cards
  { name: 'Premium Matte', category: 'Business Cards', image: '/images/business-card-1.jpg', price: 19.99, description: 'Premium Matte business card with smooth finish' },
  { name: 'Glossy Finish', category: 'Business Cards', image: '/images/business-card-2.jpg', price: 19.99, description: 'Glossy coated finish, ideal for bright designs' },
  { name: 'Spot UV', category: 'Business Cards', image: '/images/business-card-3.jpg', price: 19.99, description: 'Spot UV business card with raised glossy areas' },

  // Wedding Invitations
  { name: 'Elegant Floral', category: 'Wedding Invitations', image: '/images/wedding-1.jpg', price: 19.99, description: 'Elegant floral wedding invitation design' },
  { name: 'Modern Minimal', category: 'Wedding Invitations', image: '/images/wedding-2.jpg', price: 19.99, description: 'Modern minimal style invitation with bold text' },
  { name: 'Luxury Foil', category: 'Wedding Invitations', image: '/images/wedding-3.jpg', price: 19.99, description: 'Foil stamped invitation with a luxury finish' },

  // Brochures
  { name: 'Bi-Fold', category: 'Brochures', image: '/images/brochure-1.jpg', price: 19.99, description: 'Bi-fold brochure perfect for small businesses' },
  { name: 'Tri-Fold', category: 'Brochures', image: '/images/brochure-2.jpg', price: 19.99, description: 'Classic tri-fold layout for versatile use' },
  { name: 'Gate Fold', category: 'Brochures', image: '/images/brochure-3.jpg', price: 19.99, description: 'Elegant gate-fold brochure design' }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${inserted.length} products.`);
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedProducts();
