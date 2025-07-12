// routes/admin.js - Admin Order Management Routes
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to verify admin authentication
const verifyAdmin = (req, res, next) => {
  // Add your admin authentication logic here
  // For now, we'll just pass through
  // Example: Check if user has admin role from JWT token
  /*
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
  */
  next();
};

// Apply admin middleware to all routes
router.use(verifyAdmin);

// GET /api/admin/orders - Get all orders with filters and pagination
router.get('/orders', adminController.getAllOrders);

// GET /api/admin/orders/:orderId - Get single order details
router.get('/orders/:orderId', adminController.getOrderById);

// PUT /api/admin/orders/:orderId - Update order status and details
router.put('/orders/:orderId', adminController.updateOrder);

// POST /api/admin/orders/bulk-update - Bulk update multiple orders
router.post('/orders/bulk-update', adminController.bulkUpdateOrders);

// DELETE /api/admin/orders/:orderId - Cancel/Delete order
router.delete('/orders/:orderId', adminController.deleteOrder);

// GET /api/admin/orders/:orderId/timeline - Get order tracking timeline
router.get('/orders/:orderId/timeline', adminController.getOrderTimeline);

// GET /api/admin/reports - Generate order reports
router.get('/reports', adminController.generateReport);

// GET /api/admin/stats - Get order statistics (separate endpoint)
router.get('/stats', async (req, res) => {
  try {
    const stats = await adminController.getOrderStats();
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;