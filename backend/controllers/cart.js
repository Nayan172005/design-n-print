const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Cart = require('../models/Cart');

exports.getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
  res.status(200).json({ success: true, data: cart });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) throw new ErrorResponse('Missing fields', 400);

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });

  const idx = cart.items.findIndex(i => i.product.toString() === productId);
  if (idx > -1) {
    cart.items[idx].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json({ success: true, data: cart });
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return next(new ErrorResponse('Cart not found', 404));
  cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
  await cart.save();
  res.status(200).json({ success: true, data: cart });
});

exports.clearCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return next(new ErrorResponse('Cart not found', 404));
  cart.items = [];
  await cart.save();
  res.status(200).json({ success: true, data: cart });
});