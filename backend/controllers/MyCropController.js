// controllers/mycropController.js
const Listing = require("../models/Listing");

const mycrop = async (req, res) => {
  try {
    const { email } = req.query;
    const response = await Listing.find({ email });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get the user crops" });
  }
};

const deleteitem = async (req, res) => {
  try {
    const { item } = req.query;
    const response = await Listing.deleteOne({ name: item }); 
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Entry deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};

const updateitem = async (req, res) => {
  try {
    const { listingId } = req.query;
    const updates = req.body;

    const crop = await Listing.findById(listingId);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    Object.keys(updates).forEach((key) => {
      crop[key] = updates[key];
    });

    const updated = await crop.save();
    return res.status(200).json({ message: "Updated successfully", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update crop" });
  }
};

module.exports = { mycrop, deleteitem, updateitem };
