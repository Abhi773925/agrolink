const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/OrderController');

router.post('/order', placeOrder);

module.exports = router;
