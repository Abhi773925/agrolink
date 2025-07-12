// controllers/adminController.js - Admin Order Management Controller
const Order = require('../models/Order');
const Listing = require('../models/Listing');
const Payment = require('../models/Payment');
const mongoose = require('mongoose');

class AdminController {
  
  // Get all orders with filters and pagination
  static async getAllOrders(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        paymentStatus,
        startDate,
        endDate,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Build filter object
      const filter = {};
      
      if (status) filter.orderStatus = status;
      if (paymentStatus) filter.paymentStatus = paymentStatus;
      
      if (startDate || endDate) {
        filter.orderDate = {};
        if (startDate) filter.orderDate.$gte = new Date(startDate);
        if (endDate) filter.orderDate.$lte = new Date(endDate);
      }

      // Search functionality
      if (search) {
        filter.$or = [
          { userEmail: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { trackingNumber: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } }
        ];
      }

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Get orders with populated product details
      const orders = await Order.find(filter)
        .populate('product', 'name description price image region email')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .exec();

      // Get total count for pagination
      const totalOrders = await Order.countDocuments(filter);

      // Get payment details for each order
      const ordersWithPayments = await Promise.all(
        orders.map(async (order) => {
          const payment = await Payment.findOne({ orderId: order._id });
          return {
            ...order.toObject(),
            paymentDetails: payment
          };
        })
      );

      // Calculate stats
      const stats = await AdminController.getOrderStats();

      res.json({
        success: true,
        orders: ordersWithPayments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalOrders / parseInt(limit)),
          totalOrders,
          limit: parseInt(limit),
          hasNext: skip + parseInt(limit) < totalOrders,
          hasPrev: parseInt(page) > 1
        },
        stats
      });

    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get order statistics
  static async getOrderStats() {
    try {
      const stats = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$orderPrice' },
            pendingOrders: {
              $sum: { $cond: [{ $eq: ['$orderStatus', 'Processing'] }, 1, 0] }
            },
            shippedOrders: {
              $sum: { $cond: [{ $eq: ['$orderStatus', 'Shipped'] }, 1, 0] }
            },
            deliveredOrders: {
              $sum: { $cond: [{ $eq: ['$orderStatus', 'Delivered'] }, 1, 0] }
            },
            cancelledOrders: {
              $sum: { $cond: [{ $eq: ['$orderStatus', 'Cancelled'] }, 1, 0] }
            },
            paidOrders: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'Paid'] }, 1, 0] }
            },
            pendingPayments: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'Pending'] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        shippedOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
        paidOrders: 0,
        pendingPayments: 0
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return {};
    }
  }

  // Get single order details
  static async getOrderById(req, res) {
    try {
      const { orderId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order ID format'
        });
      }

      const order = await Order.findById(orderId)
        .populate('product', 'name description price image region email')
        .exec();

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      const payment = await Payment.findOne({ orderId: order._id });

      res.json({
        success: true,
        order: {
          ...order.toObject(),
          paymentDetails: payment
        }
      });

    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order details',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Update order status and tracking details
  static async updateOrder(req, res) {
    try {
      const { orderId } = req.params;
      const {
        orderStatus,
        paymentStatus,
        trackingNumber,
        shippingCarrier,
        estimatedDeliveryDate,
        notes,
        shippedDate,
        deliveredDate
      } = req.body;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order ID format'
        });
      }

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Prepare update object
      const updateData = {};
      
      if (orderStatus) {
        updateData.orderStatus = orderStatus;
        
        // Auto-set dates based on status
        if (orderStatus === 'Shipped' && !order.shippedDate) {
          updateData.shippedDate = new Date();
        }
        if (orderStatus === 'Delivered' && !order.deliveredDate) {
          updateData.deliveredDate = new Date();
        }
      }

      if (paymentStatus) updateData.paymentStatus = paymentStatus;
      if (trackingNumber) updateData.trackingNumber = trackingNumber;
      if (shippingCarrier) updateData.shippingCarrier = shippingCarrier;
      if (estimatedDeliveryDate) updateData.estimatedDeliveryDate = new Date(estimatedDeliveryDate);
      if (notes) updateData.notes = notes;
      if (shippedDate) updateData.shippedDate = new Date(shippedDate);
      if (deliveredDate) updateData.deliveredDate = new Date(deliveredDate);

      // Update the order
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        updateData,
        { new: true, runValidators: true }
      ).populate('product', 'name description price image region email');

      // Log the update
      console.log(`Order ${orderId} updated by admin:`, updateData);

      res.json({
        success: true,
        message: 'Order updated successfully',
        order: updatedOrder
      });

    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Bulk update orders
  static async bulkUpdateOrders(req, res) {
    try {
      const { orderIds, updateData } = req.body;

      if (!Array.isArray(orderIds) || orderIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Valid order IDs array is required'
        });
      }

      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Update data is required'
        });
      }

      // Validate all order IDs
      const validOrderIds = orderIds.filter(id => mongoose.Types.ObjectId.isValid(id));
      if (validOrderIds.length !== orderIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Some order IDs are invalid'
        });
      }

      // Prepare update data
      const finalUpdateData = { ...updateData };
      
      // Auto-set dates based on status
      if (updateData.orderStatus === 'Shipped') {
        finalUpdateData.shippedDate = new Date();
      }
      if (updateData.orderStatus === 'Delivered') {
        finalUpdateData.deliveredDate = new Date();
      }

      // Perform bulk update
      const result = await Order.updateMany(
        { _id: { $in: validOrderIds } },
        finalUpdateData,
        { runValidators: true }
      );

      res.json({
        success: true,
        message: `${result.modifiedCount} orders updated successfully`,
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount
      });

    } catch (error) {
      console.error('Error bulk updating orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update orders',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Delete order (soft delete - mark as cancelled)
  static async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order ID format'
        });
      }

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Check if order can be cancelled
      if (order.orderStatus === 'Delivered') {
        return res.status(400).json({
          success: false,
          message: 'Cannot cancel delivered orders'
        });
      }

      // Update order status to cancelled
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { 
          orderStatus: 'Cancelled',
          paymentStatus: order.paymentStatus === 'Paid' ? 'Refund Pending' : 'Cancelled'
        },
        { new: true }
      );

      // Restore product quantity
      await Listing.findByIdAndUpdate(
        order.product,
        { $inc: { quantity: order.quantity } }
      );

      res.json({
        success: true,
        message: 'Order cancelled successfully',
        order: updatedOrder
      });

    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to cancel order',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get order timeline/tracking history
  static async getOrderTimeline(req, res) {
    try {
      const { orderId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order ID format'
        });
      }

      const order = await Order.findById(orderId)
        .populate('product', 'name')
        .exec();

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Build timeline based on order data
      const timeline = [];

      // Order placed
      timeline.push({
        status: 'Order Placed',
        date: order.orderDate,
        description: `Order for ${order.product.name} has been placed`,
        icon: 'shopping-cart',
        completed: true
      });

      // Payment status
      if (order.paymentStatus === 'Paid') {
        timeline.push({
          status: 'Payment Confirmed',
          date: order.orderDate, // Assuming payment was made when order was placed
          description: `Payment of ₹${order.orderPrice} confirmed via ${order.paymentMethod}`,
          icon: 'credit-card',
          completed: true
        });
      }

      // Processing
      if (order.orderStatus !== 'Cancelled') {
        timeline.push({
          status: 'Processing',
          date: order.orderDate,
          description: 'Order is being prepared for shipment',
          icon: 'package',
          completed: ['Processing', 'Shipped', 'Delivered'].includes(order.orderStatus)
        });
      }

      // Shipped
      if (order.shippedDate) {
        timeline.push({
          status: 'Shipped',
          date: order.shippedDate,
          description: order.trackingNumber 
            ? `Shipped via ${order.shippingCarrier || 'courier'} - Tracking: ${order.trackingNumber}`
            : 'Package has been shipped',
          icon: 'truck',
          completed: true
        });
      }

      // Out for delivery
      if (order.orderStatus === 'Shipped' && order.estimatedDeliveryDate) {
        timeline.push({
          status: 'Out for Delivery',
          date: order.estimatedDeliveryDate,
          description: 'Package is out for delivery',
          icon: 'map-pin',
          completed: false,
          estimated: true
        });
      }

      // Delivered
      if (order.deliveredDate) {
        timeline.push({
          status: 'Delivered',
          date: order.deliveredDate,
          description: 'Package has been delivered successfully',
          icon: 'check-circle',
          completed: true
        });
      }

      // Cancelled
      if (order.orderStatus === 'Cancelled') {
        timeline.push({
          status: 'Cancelled',
          date: order.updatedAt,
          description: 'Order has been cancelled',
          icon: 'x-circle',
          completed: true,
          error: true
        });
      }

      res.json({
        success: true,
        timeline,
        order: {
          id: order._id,
          status: order.orderStatus,
          paymentStatus: order.paymentStatus,
          trackingNumber: order.trackingNumber,
          estimatedDelivery: order.estimatedDeliveryDate
        }
      });

    } catch (error) {
      console.error('Error fetching order timeline:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order timeline',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Generate order report
  static async generateReport(req, res) {
    try {
      const { startDate, endDate, format = 'json' } = req.query;

      const filter = {};
      if (startDate || endDate) {
        filter.orderDate = {};
        if (startDate) filter.orderDate.$gte = new Date(startDate);
        if (endDate) filter.orderDate.$lte = new Date(endDate);
      }

      const orders = await Order.find(filter)
        .populate('product', 'name price region')
        .sort({ orderDate: -1 })
        .exec();

      const report = {
        summary: {
          totalOrders: orders.length,
          totalRevenue: orders.reduce((sum, order) => sum + order.orderPrice, 0),
          avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.orderPrice, 0) / orders.length : 0,
          statusBreakdown: {
            processing: orders.filter(o => o.orderStatus === 'Processing').length,
            shipped: orders.filter(o => o.orderStatus === 'Shipped').length,
            delivered: orders.filter(o => o.orderStatus === 'Delivered').length,
            cancelled: orders.filter(o => o.orderStatus === 'Cancelled').length
          },
          paymentBreakdown: {
            paid: orders.filter(o => o.paymentStatus === 'Paid').length,
            pending: orders.filter(o => o.paymentStatus === 'Pending').length,
            failed: orders.filter(o => o.paymentStatus === 'Failed').length
          }
        },
        orders: orders.map(order => ({
          id: order._id,
          date: order.orderDate,
          customer: order.userEmail,
          product: order.product.name,
          quantity: order.quantity,
          amount: order.orderPrice,
          status: order.orderStatus,
          paymentStatus: order.paymentStatus,
          paymentMethod: order.paymentMethod,
          city: order.city,
          state: order.state
        }))
      };

      if (format === 'csv') {
        // Convert to CSV format
        const csvHeader = 'Order ID,Date,Customer,Product,Quantity,Amount,Status,Payment Status,Payment Method,City,State\n';
        const csvData = report.orders.map(order => 
          `${order.id},${order.date.toISOString().split('T')[0]},${order.customer},${order.product},${order.quantity},${order.amount},${order.status},${order.paymentStatus},${order.paymentMethod},${order.city},${order.state}`
        ).join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="orders-report.csv"');
        return res.send(csvHeader + csvData);
      }

      res.json({
        success: true,
        report
      });

    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate report',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = AdminController;