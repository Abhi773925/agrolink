const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get product details for checkout
router.get('/checkout/:id', paymentController.getProductForCheckout);

// Create Razorpay order
router.post('/create-razorpay-order', paymentController.createRazorpayOrder);

// Place order (handles both COD and online payments)
router.post('/order', paymentController.placeOrder);

// Get order details
router.get('/order/:orderId', paymentController.getOrderDetails);

// Get user orders
router.get('/orders/:userEmail', paymentController.getUserOrders);

// Handle payment webhook
router.post('/payment-webhook', paymentController.handlePaymentWebhook);

module.exports = router;