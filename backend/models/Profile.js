const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  crop: {
    type: String
  },
  region: {
    type: String
  }
});

const Profile = mongoose.model('Farmer', farmerSchema);
module.exports = Profile;
