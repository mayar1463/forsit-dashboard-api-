const express = require('express');
const router = express.Router();
const { getSales, filterSales, revenueByPeriod, compareRevenue } = require('../controllers/salesController');

router.get('/', getSales);
router.get('/filter', filterSales);
router.get('/revenue', revenueByPeriod);
router.get('/compare', compareRevenue);

module.exports = router;
