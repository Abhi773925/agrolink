
const express = require("express");
const router = express.Router();
const {
  getprofile,
  updateProfile,
  getAllProfiles,
} = require("../controllers/ProfileController");

// Routes
router.get("/profile", getprofile);
router.post('/update-profile', updateProfile);
router.get("/profiles", getAllProfiles); // 🔥 Get all profiles

module.exports = router;
