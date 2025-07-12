const express = require('express');
const router = express.Router();
const {
  getAllFarmers
} = require('../controllers/FarmerController');

// Route: GET /api/farmers
// Description: Get all farmers
router.get('/farmer', getAllFarmers);

// Route: GET /api/farmers/stats
// Description: Get farmer statistics

module.exports = router;