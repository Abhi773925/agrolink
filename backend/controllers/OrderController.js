const Order = require('../models/Order');
const Listing = require('../models/Listing');
const axios = require('axios'); // For pincode API

const placeOrder = async (req, res) => {
  try {
    const {
      userEmail,
      productId,
      quantity,
      address,
      pincode,
      phone,
      paymentMethod,
      notes
    } = req.body;

    // Fetch product
    const product = await Listing.findOne({ listingId: Number(productId) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock availability
    if (product.quantity < quantity) {
      return res.status(400).json({ message: `Only ${product.quantity} items left in stock.` });
    }

    const orderPrice = product.price * quantity;

    // Fetch pincode details
    let locationDetails = {};
    try {
      const pincodeRes = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (pincodeRes.data[0]?.Status === "Success") {
        const postOffice = pincodeRes.data[0].PostOffice[0];
        locationDetails = {
          city: postOffice.District,
          state: postOffice.State,
          country: postOffice.Country
        };
      }
    } catch (e) {
      console.error('Error fetching pincode data:', e.message);
    }

    // Create order
    const newOrder = new Order({
      userEmail,
      product: product._id,
      quantity,
      orderPrice,
      address,
      pincode,
      phone,
      paymentMethod,
      notes,
      locationDetails
    });

    await newOrder.save();

    // ✅ Update product quantity in Listing
    product.quantity -= quantity;
    await product.save();

    return res.status(201).json({ message: 'Order placed successfully!', order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error placing order' });
  }
};

module.exports = { placeOrder };
