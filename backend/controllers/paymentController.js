// controllers/paymentController.js - Complete Fixed Version
const Listing = require('../models/Listing');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const axios = require('axios'); // For pincode API

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_NQZzJ2UsyTbWvy',
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

class PaymentController {
  
  // Get product details for checkout
  static async getProductForCheckout(req, res) {
    try {
      const { id } = req.params;
      
      let listing;
      
      // Try finding by MongoDB ObjectId first, then by listingId
      if (mongoose.Types.ObjectId.isValid(id)) {
        listing = await Listing.findById(id);
      } else {
        listing = await Listing.findOne({ listingId: parseInt(id) });
      }
      
      if (!listing) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Return product details in the format expected by frontend
      res.json({
        id: listing._id,
        listingId: listing.listingId,
        name: listing.name,
        description: listing.description,
        price: listing.price,
        quantity: listing.quantity,
        region: listing.region,
        image: listing.image,
        seller: listing.email
      });

    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Create Razorpay order
  static async createRazorpayOrder(req, res) {
    try {
      const { amount, currency = 'INR', receipt } = req.body;

      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Valid amount is required'
        });
      }

      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error('Razorpay credentials not configured');
        return res.status(500).json({
          success: false,
          message: 'Payment service configuration error'
        });
      }

      const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency: currency.toUpperCase(),
        receipt: receipt || `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        payment_capture: 1
      };

      console.log('Creating Razorpay order:', options);

      const razorpayOrder = await razorpay.orders.create(options);

      res.json({
        success: true,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
        status: razorpayOrder.status
      });

    } catch (error) {
      console.error('Razorpay order creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create payment order',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Verify Razorpay signature
  static verifyRazorpaySignature(orderId, paymentId, signature) {
    try {
      const body = orderId + "|" + paymentId;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
      
      return expectedSignature === signature;
    } catch (error) {
      console.error('Error verifying Razorpay signature:', error);
      return false;
    }
  }

  // Place order (handles both COD and online payments) - MAIN FIXED FUNCTION
  static async placeOrder(req, res) {
    try {
      const {
        userEmail,
        productId,
        quantity,
        address,
        pincode,
        phone,
        paymentMethod,
        locationDetails,
        amount,
        notes,
        // Razorpay specific fields (for online payments)
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      } = req.body;

      console.log('Received order request:', {
        userEmail,
        productId,
        quantity,
        paymentMethod,
        amount
      });

      // Validation
      if (!userEmail || !productId || !quantity || !address || !pincode || !phone || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: 'All required fields must be provided'
        });
      }

      if (quantity <= 0 || !Number.isInteger(quantity)) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be a positive integer'
        });
      }

      // Find the product
      let product;
      if (mongoose.Types.ObjectId.isValid(productId)) {
        product = await Listing.findById(productId);
      } else {
        product = await Listing.findOne({ listingId: parseInt(productId) });
      }

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Check stock availability
      if (product.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.quantity} items available in stock`
        });
      }

      // Calculate total price
      const orderPrice = product.price * quantity;

      // Validate amount if provided
      if (amount && Math.abs(amount - orderPrice) > 0.01) {
        return res.status(400).json({
          success: false,
          message: 'Price mismatch detected'
        });
      }

      // For online payments, verify Razorpay signature
      if (paymentMethod !== 'COD') {
        if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
          return res.status(400).json({
            success: false,
            message: 'Payment verification details are required for online payments'
          });
        }

        const isValidSignature = PaymentController.verifyRazorpaySignature(
          razorpayOrderId, 
          razorpayPaymentId, 
          razorpaySignature
        );

        if (!isValidSignature) {
          return res.status(400).json({
            success: false,
            message: 'Invalid payment signature - payment verification failed'
          });
        }
      }

      // Fetch location details if not provided
      let finalLocationDetails = locationDetails || {};
      if (!locationDetails && pincode) {
        try {
          const pincodeRes = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
          if (pincodeRes.data[0]?.Status === "Success") {
            const postOffice = pincodeRes.data[0].PostOffice[0];
            finalLocationDetails = {
              city: postOffice.District,
              state: postOffice.State,
              country: postOffice.Country
            };
          }
        } catch (e) {
          console.error('Error fetching pincode data:', e.message);
        }
      }

      // Create order
      const newOrder = new Order({
        userEmail,
        product: product._id,
        quantity,
        orderPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        orderStatus: 'Processing',
        address,
        city: finalLocationDetails.city || '',
        state: finalLocationDetails.state || '',
        country: finalLocationDetails.country || 'India',
        pincode,
        phone,
        locationDetails: finalLocationDetails,
        estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        notes: notes || ''
      });

      const savedOrder = await newOrder.save();
      console.log('Order saved:', savedOrder._id);

      // Create payment record - IMPORTANT: Always create payment record
      const paymentRecord = new Payment({
        orderId: savedOrder._id,
        razorpayOrderId: razorpayOrderId || null,
        razorpayPaymentId: razorpayPaymentId || null,
        razorpaySignature: razorpaySignature || null,
        paymentMethod,
        amount: orderPrice,
        currency: 'INR',
        status: paymentMethod === 'COD' ? 'pending' : 'completed',
        transactionDate: new Date()
      });

      const savedPayment = await paymentRecord.save();
      console.log('Payment record saved:', savedPayment._id);

      // Update product quantity
      await Listing.findByIdAndUpdate(
        product._id,
        { $inc: { quantity: -quantity } }
      );

      console.log('Product quantity updated');

      // Prepare success response with order details
      const orderDetails = {
        orderId: savedOrder._id,
        productName: product.name,
        quantity: savedOrder.quantity,
        totalAmount: savedOrder.orderPrice,
        paymentMethod: savedOrder.paymentMethod,
        paymentStatus: savedOrder.paymentStatus,
        orderStatus: savedOrder.orderStatus,
        estimatedDelivery: savedOrder.estimatedDeliveryDate,
        address: savedOrder.address,
        city: savedOrder.city,
        state: savedOrder.state,
        pincode: savedOrder.pincode,
        phone: savedOrder.phone,
        orderDate: savedOrder.orderDate
      };

      // Send success response
      res.status(201).json({
        success: true,
        message: paymentMethod === 'COD' 
          ? '🎉 Order placed successfully! You will pay cash on delivery.' 
          : '🎉 Order placed and payment completed successfully!',
        orderDetails
      });

    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to place order. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get order details
  static async getOrderDetails(req, res) {
    try {
      const { orderId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order ID format'
        });
      }

      const order = await Order.findById(orderId)
        .populate('product', 'name description price image region')
        .exec();

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      const payment = await Payment.findOne({ orderId: order._id });

      res.json({
        success: true,
        order: {
          ...order.toObject(),
          paymentDetails: payment
        }
      });

    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order details',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get user orders
  static async getUserOrders(req, res) {
    try {
      const { userEmail } = req.params;

      if (!userEmail || !userEmail.includes('@')) {
        return res.status(400).json({
          success: false,
          message: 'Valid user email is required'
        });
      }

      const orders = await Order.find({ userEmail })
        .populate('product', 'name description price image region')
        .sort({ createdAt: -1 })
        .exec();

      // Get payment details for each order
      const ordersWithPayments = await Promise.all(
        orders.map(async (order) => {
          const payment = await Payment.findOne({ orderId: order._id });
          return {
            ...order.toObject(),
            paymentDetails: payment
          };
        })
      );

      res.json({
        success: true,
        orders: ordersWithPayments
      });

    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Handle payment webhook (for Razorpay webhooks)
  static async handlePaymentWebhook(req, res) {
    try {
      const signature = req.headers['x-razorpay-signature'];
      const body = JSON.stringify(req.body);

      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret')
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(400).json({
          success: false,
          message: 'Invalid webhook signature'
        });
      }

      const event = req.body.event;
      const paymentData = req.body.payload.payment.entity;

      switch (event) {
        case 'payment.captured':
          await PaymentController.handlePaymentSuccess(paymentData);
          break;
        case 'payment.failed':
          await PaymentController.handlePaymentFailure(paymentData);
          break;
        default:
          console.log(`Unhandled webhook event: ${event}`);
      }

      res.json({ success: true });

    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({
        success: false,
        message: 'Webhook processing failed'
      });
    }
  }

  // Handle successful payment (webhook)
  static async handlePaymentSuccess(paymentData) {
    try {
      const payment = await Payment.findOne({ 
        razorpayPaymentId: paymentData.id 
      });

      if (payment && payment.status !== 'completed') {
        payment.status = 'completed';
        await payment.save();

        await Order.findByIdAndUpdate(payment.orderId, {
          paymentStatus: 'Paid'
        });

        console.log(`Payment confirmed for order: ${payment.orderId}`);
      }
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  }

  // Handle failed payment (webhook)
  static async handlePaymentFailure(paymentData) {
    try {
      const payment = await Payment.findOne({ 
        razorpayPaymentId: paymentData.id 
      });

      if (payment) {
        payment.status = 'failed';
        payment.failureReason = paymentData.error_description || 'Payment failed';
        await payment.save();

        const order = await Order.findByIdAndUpdate(payment.orderId, {
          paymentStatus: 'Failed',
          orderStatus: 'Cancelled'
        });

        // Restore product quantity
        if (order) {
          await Listing.findByIdAndUpdate(
            order.product,
            { $inc: { quantity: order.quantity } }
          );
        }

        console.log(`Payment failed for order: ${payment.orderId}`);
      }
    } catch (error) {
      console.error('Error handling payment failure:', error);
    }
  }
}

module.exports = PaymentController;