const express = require('express');
const { getDashboard } = require('../controllers/dashboard');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getDashboard);

module.exports = router;