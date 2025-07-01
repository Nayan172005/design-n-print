const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, count: products.length, data: products });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.status(200).json({ success: true, data: product });
});