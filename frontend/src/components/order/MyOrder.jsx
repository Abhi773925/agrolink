"use client"

import { useState, useEffect } from "react"
import {
  Package,
  Truck,
  MapPin,
  Phone,
  Leaf,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Hash,
  FileText,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Minimize2,
  Maximize2,
} from "lucide-react"

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedOrders, setExpandedOrders] = useState({})
  const [expandedSections, setExpandedSections] = useState({})

  const userEmail = "rockabhisheksingh778189@gmail.com"

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/users/getorder/${userEmail}`)

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      setOrders(Array.isArray(data) ? data : [data])
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const toggleSection = (orderId, section) => {
    const key = `${orderId}-${section}`
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const isSectionExpanded = (orderId, section) => {
    return expandedSections[`${orderId}-${section}`] || false
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      case "shipped":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30"
      case "delivered":
        return "bg-green-400/20 text-green-400 border-green-400/30"
      case "cancelled":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-400/20 text-green-400 border-green-400/30"
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      case "failed":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available"
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateOnly = (dateString) => {
    if (!dateString) return "Not Available"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black/95 backdrop-blur-md p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse mx-auto mb-4">
                <Leaf className="h-6 w-6 text-black" />
              </div>
              <p className="text-white">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black/95 backdrop-blur-md p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <XCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 mb-4">Error: {error}</p>
              <button
                onClick={fetchOrders}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-yellow-400/20 shadow-lg"
              >
                <RefreshCw className="h-4 w-4 inline mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black/95 backdrop-blur-md p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-yellow-400/20 shadow-lg">
              <ShoppingCart className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white">My Orders</h1>
          </div>
          <p className="text-gray-300">Complete order details and tracking information</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-800/50 shadow-xl">
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <Package className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Orders Found</h3>
              <p className="text-gray-300 text-center">
                You haven't placed any orders yet. Start shopping for quality agricultural products!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Compact Header - Always Visible */}
                <div className="p-4 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                        <Package className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">Order #{order._id.slice(-8).toUpperCase()}</h2>
                        <p className="text-gray-300 text-sm">{formatDateOnly(order.orderDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 font-bold text-lg">₹{order.orderPrice.toLocaleString()}</span>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}
                      >
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus}
                      </span>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                      >
                        {expandedOrders[order._id] ? (
                          <Minimize2 className="h-5 w-5" />
                        ) : (
                          <Maximize2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quick Info Row */}
                  <div className="flex items-center gap-6 mt-3 text-sm">
                    <span className="text-gray-300">
                      Qty: <span className="text-white font-medium">{order.quantity}</span>
                    </span>
                    <span className="text-gray-300">
                      Payment:{" "}
                      <span
                        className={`font-medium ${order.paymentStatus === "Paid" ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </span>
                    <span className="text-gray-300">
                      Method: <span className="text-white font-medium">{order.paymentMethod}</span>
                    </span>
                  </div>
                </div>

                {/* Expandable Content */}
                {expandedOrders[order._id] && (
                  <div className="p-4 space-y-4">
                    {/* Order Details Section */}
                    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <button
                        onClick={() => toggleSection(order._id, "order")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <span className="font-medium text-white flex items-center gap-2">
                          <Hash className="h-4 w-4 text-yellow-400" />
                          Order Details
                        </span>
                        {isSectionExpanded(order._id, "order") ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>

                      {isSectionExpanded(order._id, "order") && (
                        <div className="px-4 pb-4 space-y-3 text-sm border-t border-gray-700/30">
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <span className="text-gray-300 block">Order ID:</span>
                              <span className="font-mono text-yellow-400 text-xs bg-gray-900/50 px-2 py-1 rounded">
                                {order._id}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-300 block">User Email:</span>
                              <span className="text-white font-medium">{order.userEmail}</span>
                            </div>
                            <div>
                              <span className="text-gray-300 block">Product ID:</span>
                              <span className="font-mono text-yellow-400 text-xs bg-gray-900/50 px-2 py-1 rounded">
                                {typeof order.product === "object" ? order.product._id : order.product}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-300 block">Created:</span>
                              <span className="text-white text-xs">{formatDate(order.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Shipping Address Section */}
                    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <button
                        onClick={() => toggleSection(order._id, "shipping")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <span className="font-medium text-white flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-yellow-400" />
                          Shipping Address
                        </span>
                        {isSectionExpanded(order._id, "shipping") ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>

                      {isSectionExpanded(order._id, "shipping") && (
                        <div className="px-4 pb-4 space-y-3 text-sm border-t border-gray-700/30">
                          <div className="mt-3">
                            <span className="text-gray-300 block mb-1">Full Address:</span>
                            <p className="text-white bg-gray-900/50 p-3 rounded">{order.address}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-gray-300 block">City:</span>
                              <span className="text-white">{order.city || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="text-gray-300 block">State:</span>
                              <span className="text-white">{order.state || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="text-gray-300 block">Country:</span>
                              <span className="text-white">{order.country || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="text-gray-300 block">Pincode:</span>
                              <span className="text-white bg-gray-900/50 px-2 py-1 rounded">{order.pincode}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-300 block">Phone:</span>
                            <span className="text-white flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {order.phone}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tracking Section */}
                    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <button
                        onClick={() => toggleSection(order._id, "tracking")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <span className="font-medium text-white flex items-center gap-2">
                          <Truck className="h-4 w-4 text-yellow-400" />
                          Tracking & Timeline
                        </span>
                        {isSectionExpanded(order._id, "tracking") ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>

                      {isSectionExpanded(order._id, "tracking") && (
                        <div className="px-4 pb-4 space-y-4 text-sm border-t border-gray-700/30">
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <span className="text-gray-300 block">Carrier:</span>
                              <span className="text-white">{order.shippingCarrier || "Not assigned"}</span>
                            </div>
                            <div>
                              <span className="text-gray-300 block">Tracking:</span>
                              <span className="text-white font-mono bg-gray-900/50 px-2 py-1 rounded text-xs">
                                {order.trackingNumber || "Not available"}
                              </span>
                            </div>
                          </div>

                          {/* Timeline */}
                          <div>
                            <span className="text-gray-300 block mb-3">Order Timeline:</span>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <div>
                                  <span className="text-white font-medium">Ordered: </span>
                                  <span className="text-gray-300 text-xs">{formatDate(order.orderDate)}</span>
                                </div>
                              </div>
                              {order.shippedDate && (
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">Shipped: </span>
                                    <span className="text-gray-300 text-xs">{formatDate(order.shippedDate)}</span>
                                  </div>
                                </div>
                              )}
                              {order.deliveredDate && (
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">Delivered: </span>
                                    <span className="text-gray-300 text-xs">{formatDate(order.deliveredDate)}</span>
                                  </div>
                                </div>
                              )}
                              {order.estimatedDeliveryDate && (
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">Est. Delivery: </span>
                                    <span className="text-gray-300 text-xs">
                                      {formatDateOnly(order.estimatedDeliveryDate)}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Info Section */}
                    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <button
                        onClick={() => toggleSection(order._id, "additional")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <span className="font-medium text-white flex items-center gap-2">
                          <FileText className="h-4 w-4 text-yellow-400" />
                          Additional Information
                        </span>
                        {isSectionExpanded(order._id, "additional") ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>

                      {isSectionExpanded(order._id, "additional") && (
                        <div className="px-4 pb-4 space-y-3 text-sm border-t border-gray-700/30">
                          <div className="mt-3">
                            <span className="text-gray-300 block mb-2">Special Notes:</span>
                            {order.notes ? (
                              <p className="text-white bg-gray-900/50 p-3 rounded">{order.notes}</p>
                            ) : (
                              <p className="text-gray-400 italic">No special instructions</p>
                            )}
                          </div>

                          {order.locationDetails && Object.keys(order.locationDetails).length > 0 && (
                            <div>
                              <span className="text-gray-300 block mb-2">Location Details:</span>
                              <div className="bg-gray-900/50 p-3 rounded">
                                <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                                  {JSON.stringify(order.locationDetails, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-gray-300 block">Last Updated:</span>
                              <span className="text-white text-xs">{formatDate(order.updatedAt)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {order.trackingNumber && (
                        <button className="flex items-center gap-2 px-3 py-2 border border-yellow-400/30 text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-lg transition-all duration-200 text-sm">
                          <Truck className="h-4 w-4" />
                          Track
                        </button>
                      )}
                      <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg transition-all duration-200 text-sm font-medium">
                        <Package className="h-4 w-4" />
                        Reorder
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 border border-gray-700/50 text-gray-300 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg transition-all duration-200 text-sm">
                        <Eye className="h-4 w-4" />
                        Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
