const express = require('express');
const router = express.Router();
const {
  getAllFarmers,getListingsByEmail
} = require('../controllers/FarmerController');

// Route: GET /api/farmers
// Description: Get all farmers
router.get('/farmer', getAllFarmers);
router.get('/farmer-products', getListingsByEmail);

// Route: GET /api/farmers/stats
// Description: Get farmer statistics

module.exports = router;