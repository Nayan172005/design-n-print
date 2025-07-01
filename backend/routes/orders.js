const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getOrderById } = require('../controllers/order');
const auth = require('../middleware/auth');

router.post('/', auth.protect, placeOrder);
router.get('/', auth.protect, getUserOrders);
router.get('/:orderId', auth.protect, getOrderById);

module.exports = router;