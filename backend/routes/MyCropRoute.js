const express = require('express');
const router = express.Router();

const { mycrop, deleteitem ,updateitem} = require('../controllers/MyCropController'); 

router.get('/mycrop', mycrop);      
router.delete('/deletecrop', deleteitem);
router.put('/updateitem', updateitem);

module.exports = router;
