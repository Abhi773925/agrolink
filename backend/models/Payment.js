// models/Payment.js - Corrected Payment Model
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  razorpayOrderId: {
    type: String,
    required: function() { 
      return this.paymentMethod !== 'COD'; 
    }
  },
  razorpayPaymentId: {
    type: String,
    required: function() { 
      return this.paymentMethod !== 'COD'; 
    }
  },
  razorpaySignature: {
    type: String,
    required: function() { 
      return this.paymentMethod !== 'COD'; 
    }
  },
  paymentMethod: {
  type: String,
  enum: ['COD', 'UPI', 'Online Payment', 'Credit Card', 'Debit Card', 'NetBanking'],
  required: true
}
,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  failureReason: {
    type: String,
    default: ''
  },
  refundId: {
    type: String,
    default: ''
  },
  refundAmount: {
    type: Number,
    default: 0
  },
  // Additional fields for better tracking
  gateway: {
    type: String,
    default: 'Razorpay'
  },
  gatewayResponse: {
    type: Object,
    default: {}
  }
}, { 
  timestamps: true 
});

// Index for faster queries
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ razorpayPaymentId: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);