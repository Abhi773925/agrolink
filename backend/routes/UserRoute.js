const express = require('express');
const router = express.Router();
const { createUser, getUser } = require('../controllers/UserController'); // adjust path as needed

router.post('/createuser', createUser); 
router.post('/login', getUser); 

module.exports = router;
