// controllers/dashboard.js
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');

// @desc    Get user dashboard
// @route   GET /api/dashboard
// @access  Private
exports.getDashboard = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })
    .sort('-createdAt')
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      user: req.user,
      recentOrders: orders,
      stats: {
        totalOrders: await Order.countDocuments({ user: req.user.id }),
        pendingOrders: await Order.countDocuments({ 
          user: req.user.id,
          status: 'processing'
        })
      }
    }
  });
});