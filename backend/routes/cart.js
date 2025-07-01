const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cart');

router.get('/', auth.protect, getCart);
router.post('/', auth.protect, addToCart);
router.delete('/:itemId', auth.protect, removeFromCart);
router.delete('/', auth.protect, clearCart);

module.exports = router;