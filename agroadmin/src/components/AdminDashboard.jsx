"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Download,
  Edit,
  Trash2,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  DollarSign,
  ShoppingCart,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    search: "",
    startDate: "",
    endDate: "",
  })
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    limit: 10,
    hasPrev: false,
    hasNext: false,
  }) // Initialize with default values

  // Fetch orders and stats
  useEffect(() => {
    fetchOrders()
    fetchStats()
  }, [currentPage, filters])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10", // Hardcoded limit for now, can be dynamic
        ...filters,
      })
      const response = await fetch(`http://localhost:5000/api/admin/orders?${queryParams}`)
      const data = await response.json()
      if (data.success) {
        setOrders(data.orders)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/stats")
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleUpdateOrder = async (orderId, updateData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
      if (response.ok) {
        fetchOrders()
        setShowOrderModal(false)
        setSelectedOrder(null)
      }
    } catch (error) {
      console.error("Error updating order:", error)
    }
  }

  const handleBulkUpdate = async (updateData) => {
    if (selectedOrders.length === 0) return
    try {
      const response = await fetch("http://localhost:5000/api/admin/orders/bulk-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderIds: selectedOrders,
          updateData,
        }),
      })
      if (response.ok) {
        fetchOrders()
        setSelectedOrders([])
      }
    } catch (error) {
      console.error("Error bulk updating orders:", error)
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
          method: "DELETE",
        })
        if (response.ok) {
          fetchOrders()
        }
      } catch (error) {
        console.error("Error cancelling order:", error)
      }
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      Processing: "bg-yellow-400/20 text-yellow-400",
      Shipped: "bg-yellow-400/20 text-yellow-400", // Changed from blue
      Delivered: "bg-yellow-400/20 text-yellow-400", // Changed from green
      Cancelled: "bg-red-400/20 text-red-400",
      Paid: "bg-yellow-400/20 text-yellow-400", // Changed from green
      Pending: "bg-yellow-400/20 text-yellow-400",
      Failed: "bg-red-400/20 text-red-400",
    }
    return colors[status] || "bg-gray-800/50 text-gray-300" // Changed from gray-700
  }

  const getStatusIcon = (status) => {
    const icons = {
      Processing: <Package className="w-4 h-4" />,
      Shipped: <Truck className="w-4 h-4" />,
      Delivered: <CheckCircle className="w-4 h-4" />,
      Cancelled: <XCircle className="w-4 h-4" />,
    }
    return icons[status] || <Clock className="w-4 h-4" />
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-gray-800/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  const OrderModal = ({ order, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
      orderStatus: order?.orderStatus || "",
      paymentStatus: order?.paymentStatus || "",
      trackingNumber: order?.trackingNumber || "",
      shippingCarrier: order?.shippingCarrier || "",
      estimatedDeliveryDate: order?.estimatedDeliveryDate
        ? new Date(order.estimatedDeliveryDate).toISOString().split("T")[0]
        : "",
      notes: order?.notes || "",
    })

    const handleSubmit = () => {
      onUpdate(order._id, formData)
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Update Order</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Order Status</label>
                <select
                  value={formData.orderStatus}
                  onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })}
                  className="w-full p-2 border border-gray-700/50 bg-gray-800/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="">Select Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Payment Status</label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                  className="w-full p-2 border border-gray-700/50 bg-gray-800/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="">Select Payment Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tracking Number</label>
                <input
                  type="text"
                  value={formData.trackingNumber}
                  onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                  className="w-full p-2 border border-gray-700/50 bg-gray-800/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  placeholder="Enter tracking number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Shipping Carrier</label>
                <select
                  value={formData.shippingCarrier}
                  onChange={(e) => setFormData({ ...formData, shippingCarrier: e.target.value })}
                  className="w-full p-2 border border-gray-700/50 bg-gray-800/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="">Select Carrier</option>
                  <option value="FedEx">FedEx</option>
                  <option value="UPS">UPS</option>
                  <option value="DHL">DHL</option>
                  <option value="Blue Dart">Blue Dart</option>
                  <option value="DTDC">DTDC</option>
                  <option value="India Post">India Post</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Estimated Delivery Date</label>
                <input
                  type="date"
                  value={formData.estimatedDeliveryDate}
                  onChange={(e) => setFormData({ ...formData, estimatedDeliveryDate: e.target.value })}
                  className="w-full p-2 border border-gray-700/50 bg-gray-800/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full p-2 border border-gray-700/50 bg-gray-800/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  placeholder="Add any notes or special instructions"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/95">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Order Management</h1>
          <p className="text-gray-400 mt-1">Manage and track all customer orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders || 0}
            icon={ShoppingCart}
            color="bg-yellow-600" // Changed to yellow
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue || 0)}
            icon={DollarSign}
            color="bg-yellow-600" // Changed to yellow
          />
          <StatsCard
            title="Pending Orders"
            value={stats.pendingOrders || 0}
            icon={Clock}
            color="bg-yellow-600" // Already yellow
          />
          <StatsCard
            title="Delivered Orders"
            value={stats.deliveredOrders || 0}
            icon={CheckCircle}
            color="bg-yellow-600" // Changed to yellow
          />
        </div>

        {/* Filters and Actions */}
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-gray-800/50">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 pr-4 py-2 border border-gray-700/50 bg-gray-900/50 rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 w-full sm:w-64 text-white placeholder-gray-400"
                />
              </div>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2 border border-gray-700/50 bg-gray-900/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              >
                <option value="">All Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                value={filters.paymentStatus}
                onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                className="px-4 py-2 border border-gray-700/50 bg-gray-900/50 text-white rounded-md focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              >
                <option value="">All Payment Status</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedOrders.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkUpdate({ orderStatus: "Shipped" })}
                    className="px-4 py-2 bg-yellow-600 text-black font-medium rounded-md hover:bg-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => handleBulkUpdate({ orderStatus: "Delivered" })}
                    className="px-4 py-2 bg-yellow-600 text-black font-medium rounded-md hover:bg-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
                  >
                    Mark as Delivered
                  </button>
                </div>
              )}
              <button className="px-4 py-2 bg-gray-800/50 text-white rounded-md hover:bg-gray-900/50 flex items-center gap-2 transition-colors duration-200">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800/50 rounded-lg shadow-md border border-gray-800/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/95">
                <tr>
                  <th className="w-4 p-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === orders.length && orders.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(orders.map((o) => o._id))
                        } else {
                          setSelectedOrders([])
                        }
                      }}
                      className="w-4 h-4 text-yellow-400 rounded bg-gray-800/50 border-gray-700/50 focus:ring-yellow-400/50"
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-white">Order ID</th>
                  <th className="text-left p-4 font-medium text-white">Customer</th>
                  <th className="text-left p-4 font-medium text-white">Product</th>
                  <th className="text-left p-4 font-medium text-white">Amount</th>
                  <th className="text-left p-4 font-medium text-white">Status</th>
                  <th className="text-left p-4 font-medium text-white">Payment</th>
                  <th className="text-left p-4 font-medium text-white">Date</th>
                  <th className="text-left p-4 font-medium text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-800/50 transition-colors duration-150">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders([...selectedOrders, order._id])
                          } else {
                            setSelectedOrders(selectedOrders.filter((id) => id !== order._id))
                          }
                        }}
                        className="w-4 h-4 text-yellow-400 rounded bg-gray-800/50 border-gray-700/50 focus:ring-yellow-400/50"
                      />
                    </td>
                    <td className="p-4 font-mono text-sm text-gray-300">#{order._id.slice(-8)}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-white">{order.userEmail}</p>
                        <p className="text-sm text-gray-400">{order.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {order.product?.image && (
                          <img
                            src={order.product.image || "/placeholder.svg"}
                            alt={order.product.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-white">{order.product?.name}</p>
                          <p className="text-sm text-gray-400">Qty: {order.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-white">{formatCurrency(order.orderPrice)}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}
                      >
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-400">{formatDate(order.orderDate)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowOrderModal(true)
                          }}
                          className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                          title="Edit order"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                          title="Cancel order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalOrders)} of{" "}
                {pagination.totalOrders} orders
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 text-sm font-medium text-white">
                  {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Modal */}
        {showOrderModal && selectedOrder && (
          <OrderModal
            order={selectedOrder}
            onClose={() => {
              setShowOrderModal(false)
              setSelectedOrder(null)
            }}
            onUpdate={handleUpdateOrder}
          />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
