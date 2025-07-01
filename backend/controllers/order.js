const Order = require('../models/Order');
const asyncHandler = require('../middleware/asyncHandler');

exports.placeOrder = asyncHandler(async (req, res) => {
  const { items, total } = req.body;

  const order = await Order.create({
    user: req.user.id,
    items,
    total
  });

  res.status(201).json({ success: true, data: order });
});

exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.status(200).json({ success: true, data: orders });
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.orderId, user: req.user.id }).populate('items.product');
  if (!order) return next(new ErrorResponse('Order not found', 404));

  res.status(200).json({ success: true, data: order });
});
