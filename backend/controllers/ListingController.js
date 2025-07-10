const Listing = require('../models/Listing');

const addListing = async (req, res) => {
  try {
    const { listingId, email, name, quantity, price, region, description, image } = req.body;

    const existingListing = await Listing.findOne({ listingId });
    if (existingListing) {
      return res.status(400).json({ message: 'Listing ID already exists' });
    }

    const newListing = new Listing({ listingId, email, name, quantity, price, region, description, image });
    await newListing.save();

    res.status(200).json(newListing);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add listing', error: error.message });
  }
};

module.exports = addListing;
