const express = require("express");
const AddToCartController = require("../controllers/AddToCartController");

const router = express.Router();

router.get('/cart/:id', AddToCartController);

module.exports = router;
