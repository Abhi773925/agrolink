const Listing = require("../models/Listing");

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Listing.findOne({ listingId: Number(id) }); 
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to proceed for checkout" });
  }
};

module.exports = getItem;
