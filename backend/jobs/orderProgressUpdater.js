// jobs/orderProgressUpdater.js
const Order = require('../models/Order');

const statuses = ['Processing', 'In Production', 'Quality Check', 'Shipped', 'Completed'];

async function updateOrderProgress() {
  const orders = await Order.find({ status: { $ne: 'Completed' } });

  for (const order of orders) {
    let progress = order.progress || 0;

    if (progress < 100) {
      progress += Math.floor(Math.random() * 20) + 10; // +10-30%
      if (progress >= 100) {
        order.status = 'Completed';
        progress = 100;
      } else {
        const currentIndex = statuses.indexOf(order.status);
        order.status = statuses[Math.min(currentIndex + 1, statuses.length - 2)];
      }

      order.progress = progress;
      await order.save();
    }
  }
}

module.exports = updateOrderProgress;
