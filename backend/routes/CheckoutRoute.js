const express = require('express');
const router = express.Router();
const getItem = require("../controllers/CheckoutController");

router.get("/checkout/:id", getItem);

module.exports = router;
