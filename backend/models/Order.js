const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    quantity: { type: Number, required: true, min: 1 },
    orderPrice: { type: Number, required: true }, // product price * quantity
    paymentMethod: {
  type: String,
  enum: ['COD', 'UPI', 'Credit Card', 'Debit Card', 'NetBanking'],
  default: 'COD'
}
,
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },
    orderStatus: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    },

    // Shipping & contact details
    address: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },

    // Auto-fetched or manually supplied location info
    locationDetails: {
      type: Object,
      default: {},
    },

    // Delivery tracking details
    shippingCarrier: { type: String, default: '' },
    trackingNumber: { type: String, default: '' },
    estimatedDeliveryDate: { type: Date },

    // Order dates
    orderDate: { type: Date, default: Date.now },
    shippedDate: { type: Date },
    deliveredDate: { type: Date },

    // Notes / special instructions
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
