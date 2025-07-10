const Listing = require("../models/Listing");

const AddToCartController = async (req, res) => {
  try {
    const listingId = req.params.id; 

    const response = await Listing.findById(listingId);

    if (!response) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to find the product" });
  }
};


module.exports = AddToCartController;
