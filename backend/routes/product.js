const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/product');

// @route GET /api/v1/products
router.get('/', getAllProducts);

// @route GET /api/v1/products/:id
router.get('/:id', getProductById);

module.exports = router;