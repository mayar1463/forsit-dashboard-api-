const express = require('express');
const router = express.Router();
const { getInventory, getInventoryLogs , updateInventory } = require('../controllers/inventoryController');

router.get('/', getInventory);
router.get('/logs', getInventoryLogs);
router.put('/:productId', updateInventory);

module.exports = router;
