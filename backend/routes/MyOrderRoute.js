const express = require('express');
const router = express.Router();
const getOrderDetails = require("../controllers/MyOrderController");
router.get('/getorder/:userEmail', getOrderDetails);
module.exports = router;
