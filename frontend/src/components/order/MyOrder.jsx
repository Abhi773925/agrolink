"use client"

import { useState, useEffect } from "react"
import {
  Package,
  Truck,
  Phone,
  Leaf,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  User,
  Store,
  Mail,
  MapPinIcon,
  ImageIcon,
  Calendar,
  CreditCard,
  Shield,
  Zap,
  MoreHorizontal,
  ArrowRight,
  Hash,
  FileText,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Menu,
} from "lucide-react"

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [showSidebar, setShowSidebar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    fetchOrders()

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setShowSidebar(false)
      } else {
        setShowSidebar(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
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
      if (data.length > 0) {
        setSelectedOrder(Array.isArray(data) ? data[0] : data)
      }
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isSectionExpanded = (section) => {
    return expandedSections[section] || false
  }

  const handleOrderSelect = (order) => {
    setSelectedOrder(order)
    if (isMobile) {
      setShowSidebar(false)
    }
  }

  const handleBackToList = () => {
    if (isMobile) {
      setShowSidebar(true)
      setSelectedOrder(null)
    }
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
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/50"
      case "shipped":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-spin mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-black" />
                </div>
                <div className="absolute inset-0 w-16 h-16 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse mx-auto"></div>
              </div>
              <p className="text-white text-lg font-medium">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black/95 backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl p-8">
              <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 mb-4 text-lg font-semibold">Error: {error}</p>
              <button
                onClick={fetchOrders}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-yellow-400/20 shadow-lg"
              >
                <RefreshCw className="h-5 w-5 inline mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black/95 backdrop-blur-md">
      {/* Global styles to hide scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>

      {/* Mobile Header */}
      {isMobile && (
        <div className="md:hidden backdrop-blur-md border-b border-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            {selectedOrder && !showSidebar ? (
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Orders</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-black" />
                </div>
                <h1 className="text-xl font-bold text-white">My Orders</h1>
              </div>
            )}
            {!selectedOrder && (
              <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 text-gray-400 hover:text-white">
                <Menu className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex">
        {/* Left Sidebar - Order List */}
        <div
          className={`${
            isMobile ? (showSidebar ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-md" : "hidden") : "w-1/3"
          } ${!isMobile ? "min-h-screen border-r border-gray-800/50" : ""} ${isMobile ? "p-4 pt-20" : "p-6"}`}
        >
          {/* Desktop Header */}
          {!isMobile && (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl shadow-yellow-400/20 shadow-lg">
                  <ShoppingCart className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">My Orders</h1>
                  <p className="text-gray-400 text-sm">{orders.length} orders found</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-xs font-medium">Delivered</span>
                  </div>
                  <p className="text-white font-bold text-lg mt-1">
                    {orders.filter((o) => o.orderStatus.toLowerCase() === "delivered").length}
                  </p>
                </div>
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-medium">Active</span>
                  </div>
                  <p className="text-white font-bold text-lg mt-1">
                    {orders.filter((o) => o.orderStatus.toLowerCase() !== "delivered").length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Stats Cards */}
          {isMobile && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">Delivered</span>
                </div>
                <p className="text-white font-bold text-lg mt-1">
                  {orders.filter((o) => o.orderStatus.toLowerCase() === "delivered").length}
                </p>
              </div>
              <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-medium">Active</span>
                </div>
                <p className="text-white font-bold text-lg mt-1">
                  {orders.filter((o) => o.orderStatus.toLowerCase() !== "delivered").length}
                </p>
              </div>
            </div>
          )}

          {/* Order List */}
          <div
            className={`space-y-3 ${!isMobile ? "max-h-[calc(100vh-300px)]" : "max-h-[calc(100vh-200px)]"} overflow-y-auto no-scrollbar`}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleOrderSelect(order)}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedOrder?._id === order._id && !isMobile
                    ? "bg-gray-800/50 border-yellow-400/50 shadow-yellow-400/20 shadow-lg"
                    : "bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50"
                } backdrop-blur-md border rounded-xl p-4`}
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                      <Package className="h-4 w-4 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">#{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-gray-400 text-xs">{formatDateOnly(order.orderDate)}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>

                {/* Product Info */}
                {order.productDetails && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800/50 flex-shrink-0">
                      {order.productDetails.image ? (
                        <img
                          src={order.productDetails.image || "/placeholder.svg"}
                          alt={order.productDetails.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{order.productDetails.name}</p>
                      <p className="text-gray-400 text-xs">Qty: {order.quantity}</p>
                    </div>
                  </div>
                )}

                {/* Status and Price */}
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(order.orderStatus)}`}
                  >
                    {getStatusIcon(order.orderStatus)}
                    {order.orderStatus}
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold text-sm">₹{order.orderPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Order Details */}
        <div className={`${isMobile ? (showSidebar ? "hidden" : "w-full") : "flex-1"} ${isMobile ? "p-4" : "p-6"}`}>
          {selectedOrder ? (
            <div className={`${!isMobile ? "max-w-4xl" : "w-full"}`}>
              {/* Order Header */}
              <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl p-4 md:p-6 mb-6">
                <div className={`${isMobile ? "space-y-4" : "flex items-start justify-between"} mb-6`}>
                  <div>
                    <div className={`${isMobile ? "space-y-2" : "flex items-center gap-4"} mb-2`}>
                      <h2 className={`${isMobile ? "text-xl" : "text-3xl"} font-bold text-white`}>
                        Order #{selectedOrder._id.slice(-8).toUpperCase()}
                      </h2>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-medium border ${getStatusColor(selectedOrder.orderStatus)}`}
                      >
                        {getStatusIcon(selectedOrder.orderStatus)}
                        {selectedOrder.orderStatus}
                      </div>
                    </div>
                    <div className={`${isMobile ? "space-y-2" : "flex items-center gap-6"} text-sm text-gray-300`}>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedOrder.orderDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        {selectedOrder.paymentMethod}
                      </div>
                    </div>
                  </div>
                  <div className={`${isMobile ? "" : "text-right"}`}>
                    <p className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-yellow-400`}>
                      ₹{selectedOrder.orderPrice.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">Total Amount</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`${isMobile ? "grid grid-cols-1 gap-2" : "flex gap-3"}`}>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-yellow-400/50 rounded-lg text-sm font-medium transition-all duration-300">
                    <Truck className="h-4 w-4" />
                    Track Order
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg text-sm font-medium shadow-yellow-400/20 shadow-lg transition-all duration-300">
                    <Package className="h-4 w-4" />
                    Reorder
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-yellow-400/50 rounded-lg text-sm font-medium transition-all duration-300">
                    <MoreHorizontal className="h-4 w-4" />
                    More
                  </button>
                </div>
              </div>

              {/* Detailed Sections */}
              <div className="space-y-4 md:space-y-6">
                {/* Product Details Section */}
                {selectedOrder.productDetails && (
                  <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("product")}
                      className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-800/50 transition-colors duration-300"
                    >
                      <span className="font-semibold text-white flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                          <Package className="h-5 w-5 text-black" />
                        </div>
                        Product Details
                      </span>
                      {isSectionExpanded("product") ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {isSectionExpanded("product") && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-800/50">
                        <div className={`${isMobile ? "space-y-4" : "flex gap-6"} mt-4 md:mt-6`}>
                          <div
                            className={`${isMobile ? "w-full" : "w-32 h-32"} ${isMobile ? "h-48" : ""} rounded-2xl overflow-hidden bg-gray-800/50 flex-shrink-0`}
                          >
                            {selectedOrder.productDetails.image ? (
                              <img
                                src={selectedOrder.productDetails.image || "/placeholder.svg"}
                                alt={selectedOrder.productDetails.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h4 className={`text-white font-bold ${isMobile ? "text-lg" : "text-xl"} mb-2`}>
                                {selectedOrder.productDetails.name}
                              </h4>
                              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                {selectedOrder.productDetails.description}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                              <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                                <span className="text-gray-400 text-sm block mb-1">Unit Price</span>
                                <span className="text-yellow-400 font-bold text-lg flex items-center gap-1">
                                  <IndianRupee className="h-4 w-4" />
                                  {selectedOrder.productDetails.price.toLocaleString()}
                                </span>
                              </div>
                              <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                                <span className="text-gray-400 text-sm block mb-1">Region</span>
                                <span className="text-white font-semibold flex items-center gap-1">
                                  <MapPinIcon className="h-4 w-4 text-yellow-400" />
                                  {selectedOrder.productDetails.region}
                                </span>
                              </div>
                              <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                                <span className="text-gray-400 text-sm block mb-1">Listing ID</span>
                                <span className="font-mono text-yellow-400 text-sm bg-gray-900/50 px-2 py-1 rounded">
                                  {selectedOrder.productDetails.listingId}
                                </span>
                              </div>
                              <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                                <span className="text-gray-400 text-sm block mb-1">Product ID</span>
                                <span className="font-mono text-yellow-400 text-sm bg-gray-900/50 px-2 py-1 rounded break-all">
                                  {selectedOrder.productDetails._id}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Seller Details Section */}
                {selectedOrder.sellerDetails && (
                  <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("seller")}
                      className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-800/50 transition-colors duration-300"
                    >
                      <span className="font-semibold text-white flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                          <Store className="h-5 w-5 text-black" />
                        </div>
                        Seller Information
                      </span>
                      {isSectionExpanded("seller") ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {isSectionExpanded("seller") && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-800/50">
                        <div className="bg-gray-800/50 rounded-2xl p-4 md:p-6 mt-4 md:mt-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-yellow-400/20 shadow-lg">
                              <User className="h-6 w-6 text-black" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-lg">{selectedOrder.sellerDetails.name}</h4>
                              <p className="text-yellow-400 text-sm font-medium">Verified Seller</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
                              <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Email:</span>
                              <span className="text-white font-medium text-sm break-all">
                                {selectedOrder.sellerDetails.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
                              <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Phone:</span>
                              <span className="text-white font-medium text-sm">
                                {selectedOrder.sellerDetails.phone}
                              </span>
                            </div>
                          </div>
                          <button className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-3 rounded-xl text-sm font-medium shadow-yellow-400/20 shadow-lg transition-all duration-300">
                            Contact Seller
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Order Details Section */}
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("order")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <span className="font-semibold text-white flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                        <Hash className="h-5 w-5 text-black" />
                      </div>
                      Order Details
                    </span>
                    {isSectionExpanded("order") ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {isSectionExpanded("order") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-800/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
                        <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                          <span className="text-gray-400 text-sm block mb-1">Order ID</span>
                          <span className="font-mono text-yellow-400 text-xs md:text-sm bg-gray-900/50 px-2 py-1 rounded break-all">
                            {selectedOrder._id}
                          </span>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                          <span className="text-gray-400 text-sm block mb-1">User Email</span>
                          <span className="text-white font-medium text-sm break-all">{selectedOrder.userEmail}</span>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                          <span className="text-gray-400 text-sm block mb-1">Product ID</span>
                          <span className="font-mono text-yellow-400 text-xs md:text-sm bg-gray-900/50 px-2 py-1 rounded break-all">
                            {typeof selectedOrder.product === "object"
                              ? selectedOrder.product._id
                              : selectedOrder.product}
                          </span>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                          <span className="text-gray-400 text-sm block mb-1">Created</span>
                          <span className="text-white text-sm">{formatDate(selectedOrder.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping Address Section */}
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("shipping")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <span className="font-semibold text-white flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                        <MapPinIcon className="h-5 w-5 text-black" />
                      </div>
                      Shipping Address
                    </span>
                    {isSectionExpanded("shipping") ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {isSectionExpanded("shipping") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-800/50">
                      <div className="space-y-4 mt-4 md:mt-6">
                        <div>
                          <span className="text-gray-400 text-sm block mb-2">Full Address</span>
                          <p className="text-white bg-gray-800/50 p-3 md:p-4 rounded-xl">{selectedOrder.address}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                            <span className="text-gray-400 text-sm block mb-1">City</span>
                            <span className="text-white">{selectedOrder.city || "Not specified"}</span>
                          </div>
                          <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                            <span className="text-gray-400 text-sm block mb-1">State</span>
                            <span className="text-white">{selectedOrder.state || "Not specified"}</span>
                          </div>
                          <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                            <span className="text-gray-400 text-sm block mb-1">Country</span>
                            <span className="text-white">{selectedOrder.country || "Not specified"}</span>
                          </div>
                          <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                            <span className="text-gray-400 text-sm block mb-1">Pincode</span>
                            <span className="text-white bg-gray-900/50 px-2 py-1 rounded">{selectedOrder.pincode}</span>
                          </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                          <span className="text-gray-400 text-sm block mb-2">Phone</span>
                          <span className="text-white flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {selectedOrder.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tracking Section */}
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("tracking")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <span className="font-semibold text-white flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                        <Truck className="h-5 w-5 text-black" />
                      </div>
                      Tracking & Timeline
                    </span>
                    {isSectionExpanded("tracking") ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {isSectionExpanded("tracking") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-800/50">
                      <div className="space-y-6 mt-4 md:mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                            <span className="text-gray-400 text-sm block mb-1">Carrier</span>
                            <span className="text-white">{selectedOrder.shippingCarrier || "Not assigned"}</span>
                          </div>
                          <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                            <span className="text-gray-400 text-sm block mb-1">Tracking Number</span>
                            <span className="text-white font-mono bg-gray-900/50 px-2 py-1 rounded text-sm break-all">
                              {selectedOrder.trackingNumber || "Not available"}
                            </span>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div>
                          <span className="text-gray-300 text-lg font-semibold block mb-4">Order Timeline</span>
                          <div className="space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
                              <div className="flex-1">
                                <span className="text-white font-medium block">Order Placed</span>
                                <span className="text-gray-300 text-sm">{formatDate(selectedOrder.orderDate)}</span>
                              </div>
                            </div>
                            {selectedOrder.shippedDate && (
                              <div className="flex items-start gap-4">
                                <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <span className="text-white font-medium block">Shipped</span>
                                  <span className="text-gray-300 text-sm">{formatDate(selectedOrder.shippedDate)}</span>
                                </div>
                              </div>
                            )}
                            {selectedOrder.deliveredDate && (
                              <div className="flex items-start gap-4">
                                <div className="w-3 h-3 bg-green-400 rounded-full mt-1 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <span className="text-white font-medium block">Delivered</span>
                                  <span className="text-gray-300 text-sm">
                                    {formatDate(selectedOrder.deliveredDate)}
                                  </span>
                                </div>
                              </div>
                            )}
                            {selectedOrder.estimatedDeliveryDate && (
                              <div className="flex items-start gap-4">
                                <div className="w-3 h-3 bg-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <span className="text-white font-medium block">Estimated Delivery</span>
                                  <span className="text-gray-300 text-sm">
                                    {formatDateOnly(selectedOrder.estimatedDeliveryDate)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Information Section */}
                <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("additional")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <span className="font-semibold text-white flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                        <FileText className="h-5 w-5 text-black" />
                      </div>
                      Additional Information
                    </span>
                    {isSectionExpanded("additional") ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {isSectionExpanded("additional") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-800/50">
                      <div className="space-y-4 mt-4 md:mt-6">
                        <div>
                          <span className="text-gray-400 text-sm block mb-2">Special Notes</span>
                          {selectedOrder.notes ? (
                            <p className="text-white bg-gray-800/50 p-3 md:p-4 rounded-xl">{selectedOrder.notes}</p>
                          ) : (
                            <p className="text-gray-400 italic">No special instructions</p>
                          )}
                        </div>
                        {selectedOrder.locationDetails && Object.keys(selectedOrder.locationDetails).length > 0 && (
                          <div>
                            <span className="text-gray-400 text-sm block mb-2">Location Details</span>
                            <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl">
                              <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                                {JSON.stringify(selectedOrder.locationDetails, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                        <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                          <span className="text-gray-400 text-sm block mb-1">Last Updated</span>
                          <span className="text-white text-sm">{formatDate(selectedOrder.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select an Order</h3>
                <p className="text-gray-400">Choose an order from the left to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
