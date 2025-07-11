const Order = require("../models/Order");

const getOrderDetails = async (req, res) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }

    const orders = await Order.find({ userEmail });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Failed to get the order details." });
  }
};

module.exports = getOrderDetails;
