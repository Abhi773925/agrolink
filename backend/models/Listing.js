const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listingId: {
    type: Number,
    required: true,
    unique: true, // Ensure this stays unique
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
