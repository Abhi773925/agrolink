const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// Get product details for checkout
router.get('/checkout/:id', PaymentController.getProductForCheckout);

// Create Razorpay order
router.post('/create-razorpay-order', PaymentController.createRazorpayOrder);

// Place order (handles both COD and online payments)
router.post('/order', PaymentController.placeOrder);

// Get order details
router.get('/order/:orderId', PaymentController.getOrderDetails);

// Get user orders
router.get('/orders/:userEmail', PaymentController.getUserOrders);

// Handle payment webhook
router.post('/payment-webhook', PaymentController.handlePaymentWebhook);

module.exports = router;