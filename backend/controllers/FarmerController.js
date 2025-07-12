const Profile = require('../models/Profile');

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Profile.find();
    res.status(200).json(farmers);
  } catch (error) {
    console.error("Error fetching farmers:", error);
    res.status(500).json({ message: "Failed to fetch farmers." });
  }
};

module.exports = { getAllFarmers };
