const Order = require("../models/Order");
const Listing = require("../models/Listing"); // Import Listing model
const User = require("../models/User"); // Import User model

const getOrderDetails = async (req, res) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }

    // Find orders and populate product and seller details
    const orders = await Order.find({ userEmail }).lean();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    // Enrich orders with product and seller information
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        let productDetails = null;
        let sellerDetails = null;

        try {
          // Get product details from Listing
          if (order.product) {
            const productId = typeof order.product === 'object' ? order.product._id : order.product;
            productDetails = await Listing.findById(productId).lean();
            
            // Get seller details if product found
            if (productDetails && productDetails.email) {
              sellerDetails = await User.findOne({ email: productDetails.email }).lean();
            }
          }
        } catch (error) {
          console.error(`Error fetching details for order ${order._id}:`, error);
        }

        return {
          ...order,
          productDetails: productDetails ? {
            _id: productDetails._id,
            name: productDetails.name,
            description: productDetails.description,
            price: productDetails.price,
            image: productDetails.image,
            region: productDetails.region,
            listingId: productDetails.listingId
          } : null,
          sellerDetails: sellerDetails ? {
            name: sellerDetails.name,
            email: sellerDetails.email,
            phone: sellerDetails.phone
          } : null
        };
      })
    );

    res.status(200).json(enrichedOrders);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Failed to get the order details." });
  }
};

module.exports = getOrderDetails;