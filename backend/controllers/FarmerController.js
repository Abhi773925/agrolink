const Profile = require('../models/Profile');
const Listing = require('../models/Listing');
const getListingsByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required in query." });
  }

  try {
    const listings = await Listing.find({ email });

    if (!listings || listings.length === 0) {
      return res.status(404).json({ message: "No listings found for this email." });
    }

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Profile.find();
    res.status(200).json(farmers);
  } catch (error) {
    console.error("Error fetching farmers:", error);
    res.status(500).json({ message: "Failed to fetch farmers." });
  }
};

module.exports = { getAllFarmers,getListingsByEmail };
