const addListing=require('../controllers/ListingController');
const express=require('express');
const router = express.Router();
router.post('/listing',addListing);
module.exports=router;