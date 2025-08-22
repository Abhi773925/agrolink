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
      const response = await fetch(`https://agrolink-5ok6.onrender.com/api/users/getorder/${userEmail}`)
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
        return "bg-[#22C55E]/20 text-[#FFFFFF] border-[#374151]/50"
      case "shipped":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "cancelled":
        return "bg-red-500/20 text-[#F87171] border-red-500/50"
      default:
        return "bg-gray-500/20 text-[#D1D5DB] border-gray-500/50"
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
      <div className="min-h-screen bg-[#111827] backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center animate-spin mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-[#D1D5DB]" />
                </div>
                <div className="absolute inset-0 w-16 h-16 bg-[#22C55E] rounded-full blur-xl opacity-50 animate-pulse mx-auto"></div>
              </div>
              <p className="text-[#FFFFFF] text-lg font-medium">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111827] backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl p-8">
              <XCircle className="h-12 w-12 text-[#F87171] mx-auto mb-4" />
              <p className="text-[#F87171] mb-4 text-lg font-semibold">Error: {error}</p>
              <button
                onClick={fetchOrders}
                className="bg-[#22C55E] hover:bg-[#374151 text-[#D1D5DB] px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-[#22C55E]/20 shadow-lg"
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
    <div className="min-h-screen bg-[#111827] backdrop-blur-md">
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
        <div className="md:hidden backdrop-blur-md border-b border-[#374151] p-4">
          <div className="flex items-center justify-between">
            {selectedOrder && !showSidebar ? (
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-[#FFFFFF] hover:text-[#FFFFFF] transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Orders</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#22C55E] rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-[#D1D5DB]" />
                </div>
                <h1 className="text-xl font-bold text-[#FFFFFF]">My Orders</h1>
              </div>
            )}
            {!selectedOrder && (
              <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 text-[#D1D5DB] hover:text-[#FFFFFF]">
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
            isMobile ? (showSidebar ? "fixed inset-0 z-50 bg-[#111827] backdrop-blur-md" : "hidden") : "w-1/3"
          } ${!isMobile ? "min-h-screen border-r border-[#374151]" : ""} ${isMobile ? "p-4 pt-20" : "p-6"}`}
        >
          {/* Desktop Header */}
          {!isMobile && (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#22C55E] rounded-xl shadow-[#22C55E]/20 shadow-lg">
                  <ShoppingCart className="h-6 w-6 text-[#D1D5DB]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#FFFFFF]">My Orders</h1>
                  <p className="text-[#D1D5DB] text-sm">{orders.length} orders found</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-xs font-medium">Delivered</span>
                  </div>
                  <p className="text-[#FFFFFF] font-bold text-lg mt-1">
                    {orders.filter((o) => o.orderStatus.toLowerCase() === "delivered").length}
                  </p>
                </div>
                <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#FFFFFF]" />
                    <span className="text-[#FFFFFF] text-xs font-medium">Active</span>
                  </div>
                  <p className="text-[#FFFFFF] font-bold text-lg mt-1">
                    {orders.filter((o) => o.orderStatus.toLowerCase() !== "delivered").length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Stats Cards */}
          {isMobile && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">Delivered</span>
                </div>
                <p className="text-[#FFFFFF] font-bold text-lg mt-1">
                  {orders.filter((o) => o.orderStatus.toLowerCase() === "delivered").length}
                </p>
              </div>
              <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#FFFFFF]" />
                  <span className="text-[#FFFFFF] text-xs font-medium">Active</span>
                </div>
                <p className="text-[#FFFFFF] font-bold text-lg mt-1">
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
                    ? "bg-[#374151 ] border-[#374151]/50 shadow-[#22C55E]/20 shadow-lg"
                    : "bg-[#1F2937]/50 border-[#374151] hover:border-[#374151]/50"
                } backdrop-blur-md border rounded-xl p-4`}
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#22C55E] rounded-lg">
                      <Package className="h-4 w-4 text-[#D1D5DB]" />
                    </div>
                    <div>
                      <p className="text-[#FFFFFF] font-semibold text-sm">#{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-[#D1D5DB] text-xs">{formatDateOnly(order.orderDate)}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#D1D5DB]" />
                </div>

                {/* Product Info */}
                {order.productDetails && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#374151 ] flex-shrink-0">
                      {order.productDetails.image ? (
                        <img
                          src={order.productDetails.image || "/placeholder.svg"}
                          alt={order.productDetails.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-[#D1D5DB]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#FFFFFF] text-sm font-medium truncate">{order.productDetails.name}</p>
                      <p className="text-[#D1D5DB] text-xs">Qty: {order.quantity}</p>
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
                    <p className="text-[#FFFFFF] font-bold text-sm">₹{order.orderPrice.toLocaleString()}</p>
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
              <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl p-4 md:p-6 mb-6">
                <div className={`${isMobile ? "space-y-4" : "flex items-start justify-between"} mb-6`}>
                  <div>
                    <div className={`${isMobile ? "space-y-2" : "flex items-center gap-4"} mb-2`}>
                      <h2 className={`${isMobile ? "text-xl" : "text-3xl"} font-bold text-[#FFFFFF]`}>
                        Order #{selectedOrder._id.slice(-8).toUpperCase()}
                      </h2>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-medium border ${getStatusColor(selectedOrder.orderStatus)}`}
                      >
                        {getStatusIcon(selectedOrder.orderStatus)}
                        {selectedOrder.orderStatus}
                      </div>
                    </div>
                    <div className={`${isMobile ? "space-y-2" : "flex items-center gap-6"} text-sm text-[#D1D5DB]`}>
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
                    <p className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-[#FFFFFF]`}>
                      ₹{selectedOrder.orderPrice.toLocaleString()}
                    </p>
                    <p className="text-[#D1D5DB] text-sm">Total Amount</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`${isMobile ? "grid grid-cols-1 gap-2" : "flex gap-3"}`}>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#374151 ] border border-[#374151]/50 text-[#D1D5DB] hover:text-[#FFFFFF] hover:border-[#374151]/50 rounded-lg text-sm font-medium transition-all duration-300">
                    <Truck className="h-4 w-4" />
                    Track Order
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#22C55E] hover:bg-[#374151 text-[#D1D5DB] rounded-lg text-sm font-medium shadow-[#22C55E]/20 shadow-lg transition-all duration-300">
                    <Package className="h-4 w-4" />
                    Reorder
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#374151 ] border border-[#374151]/50 text-[#D1D5DB] hover:text-[#FFFFFF] hover:border-[#374151]/50 rounded-lg text-sm font-medium transition-all duration-300">
                    <MoreHorizontal className="h-4 w-4" />
                    More
                  </button>
                </div>
              </div>

              {/* Detailed Sections */}
              <div className="space-y-4 md:space-y-6">
                {/* Product Details Section */}
                {selectedOrder.productDetails && (
                  <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("product")}
                      className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[#374151 ] transition-colors duration-300"
                    >
                      <span className="font-semibold text-[#FFFFFF] flex items-center gap-3">
                        <div className="p-2 bg-[#22C55E] rounded-lg">
                          <Package className="h-5 w-5 text-[#D1D5DB]" />
                        </div>
                        Product Details
                      </span>
                      {isSectionExpanded("product") ? (
                        <ChevronUp className="h-5 w-5 text-[#D1D5DB]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-[#D1D5DB]" />
                      )}
                    </button>
                    {isSectionExpanded("product") && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[#374151]">
                        <div className={`${isMobile ? "space-y-4" : "flex gap-6"} mt-4 md:mt-6`}>
                          <div
                            className={`${isMobile ? "w-full" : "w-32 h-32"} ${isMobile ? "h-48" : ""} rounded-2xl overflow-hidden bg-[#374151 ] flex-shrink-0`}
                          >
                            {selectedOrder.productDetails.image ? (
                              <img
                                src={selectedOrder.productDetails.image || "/placeholder.svg"}
                                alt={selectedOrder.productDetails.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="h-12 w-12 text-[#D1D5DB]" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h4 className={`text-[#FFFFFF] font-bold ${isMobile ? "text-lg" : "text-xl"} mb-2`}>
                                {selectedOrder.productDetails.name}
                              </h4>
                              <p className="text-[#D1D5DB] leading-relaxed text-sm md:text-base">
                                {selectedOrder.productDetails.description}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                              <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                                <span className="text-[#D1D5DB] text-sm block mb-1">Unit Price</span>
                                <span className="text-[#FFFFFF] font-bold text-lg flex items-center gap-1">
                                  <IndianRupee className="h-4 w-4" />
                                  {selectedOrder.productDetails.price.toLocaleString()}
                                </span>
                              </div>
                              <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                                <span className="text-[#D1D5DB] text-sm block mb-1">Region</span>
                                <span className="text-[#FFFFFF] font-semibold flex items-center gap-1">
                                  <MapPinIcon className="h-4 w-4 text-[#FFFFFF]" />
                                  {selectedOrder.productDetails.region}
                                </span>
                              </div>
                              <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                                <span className="text-[#D1D5DB] text-sm block mb-1">Listing ID</span>
                                <span className="font-mono text-[#FFFFFF] text-sm bg-[#1F2937]/50 px-2 py-1 rounded">
                                  {selectedOrder.productDetails.listingId}
                                </span>
                              </div>
                              <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                                <span className="text-[#D1D5DB] text-sm block mb-1">Product ID</span>
                                <span className="font-mono text-[#FFFFFF] text-sm bg-[#1F2937]/50 px-2 py-1 rounded break-all">
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
                  <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("seller")}
                      className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[#374151 ] transition-colors duration-300"
                    >
                      <span className="font-semibold text-[#FFFFFF] flex items-center gap-3">
                        <div className="p-2 bg-[#22C55E] rounded-lg">
                          <Store className="h-5 w-5 text-[#D1D5DB]" />
                        </div>
                        Seller Information
                      </span>
                      {isSectionExpanded("seller") ? (
                        <ChevronUp className="h-5 w-5 text-[#D1D5DB]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-[#D1D5DB]" />
                      )}
                    </button>
                    {isSectionExpanded("seller") && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[#374151]">
                        <div className="bg-[#374151 ] rounded-2xl p-4 md:p-6 mt-4 md:mt-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center shadow-[#22C55E]/20 shadow-lg">
                              <User className="h-6 w-6 text-[#D1D5DB]" />
                            </div>
                            <div>
                              <h4 className="text-[#FFFFFF] font-bold text-lg">{selectedOrder.sellerDetails.name}</h4>
                              <p className="text-[#FFFFFF] text-sm font-medium">Verified Seller</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-[#1F2937]/50 rounded-xl">
                              <Mail className="h-5 w-5 text-[#D1D5DB] flex-shrink-0" />
                              <span className="text-[#D1D5DB] text-sm">Email:</span>
                              <span className="text-[#FFFFFF] font-medium text-sm break-all">
                                {selectedOrder.sellerDetails.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-[#1F2937]/50 rounded-xl">
                              <Phone className="h-5 w-5 text-[#D1D5DB] flex-shrink-0" />
                              <span className="text-[#D1D5DB] text-sm">Phone:</span>
                              <span className="text-[#FFFFFF] font-medium text-sm">
                                {selectedOrder.sellerDetails.phone}
                              </span>
                            </div>
                          </div>
                          <button className="w-full mt-4 bg-[#22C55E] hover:bg-[#374151 text-[#D1D5DB] py-3 rounded-xl text-sm font-medium shadow-[#22C55E]/20 shadow-lg transition-all duration-300">
                            Contact Seller
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Order Details Section */}
                <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("order")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[#374151 ] transition-colors duration-300"
                  >
                    <span className="font-semibold text-[#FFFFFF] flex items-center gap-3">
                      <div className="p-2 bg-[#22C55E] rounded-lg">
                        <Hash className="h-5 w-5 text-[#D1D5DB]" />
                      </div>
                      Order Details
                    </span>
                    {isSectionExpanded("order") ? (
                      <ChevronUp className="h-5 w-5 text-[#D1D5DB]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#D1D5DB]" />
                    )}
                  </button>
                  {isSectionExpanded("order") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[#374151]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
                        <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                          <span className="text-[#D1D5DB] text-sm block mb-1">Order ID</span>
                          <span className="font-mono text-[#FFFFFF] text-xs md:text-sm bg-[#1F2937]/50 px-2 py-1 rounded break-all">
                            {selectedOrder._id}
                          </span>
                        </div>
                        <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                          <span className="text-[#D1D5DB] text-sm block mb-1">User Email</span>
                          <span className="text-[#FFFFFF] font-medium text-sm break-all">{selectedOrder.userEmail}</span>
                        </div>
                        <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                          <span className="text-[#D1D5DB] text-sm block mb-1">Product ID</span>
                          <span className="font-mono text-[#FFFFFF] text-xs md:text-sm bg-[#1F2937]/50 px-2 py-1 rounded break-all">
                            {typeof selectedOrder.product === "object"
                              ? selectedOrder.product._id
                              : selectedOrder.product}
                          </span>
                        </div>
                        <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                          <span className="text-[#D1D5DB] text-sm block mb-1">Created</span>
                          <span className="text-[#FFFFFF] text-sm">{formatDate(selectedOrder.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping Address Section */}
                <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("shipping")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[#374151 ] transition-colors duration-300"
                  >
                    <span className="font-semibold text-[#FFFFFF] flex items-center gap-3">
                      <div className="p-2 bg-[#22C55E] rounded-lg">
                        <MapPinIcon className="h-5 w-5 text-[#D1D5DB]" />
                      </div>
                      Shipping Address
                    </span>
                    {isSectionExpanded("shipping") ? (
                      <ChevronUp className="h-5 w-5 text-[#D1D5DB]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#D1D5DB]" />
                    )}
                  </button>
                  {isSectionExpanded("shipping") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[#374151]">
                      <div className="space-y-4 mt-4 md:mt-6">
                        <div>
                          <span className="text-[#D1D5DB] text-sm block mb-2">Full Address</span>
                          <p className="text-[#FFFFFF] bg-[#374151 ] p-3 md:p-4 rounded-xl">{selectedOrder.address}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                            <span className="text-[#D1D5DB] text-sm block mb-1">City</span>
                            <span className="text-[#FFFFFF]">{selectedOrder.city || "Not specified"}</span>
                          </div>
                          <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                            <span className="text-[#D1D5DB] text-sm block mb-1">State</span>
                            <span className="text-[#FFFFFF]">{selectedOrder.state || "Not specified"}</span>
                          </div>
                          <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                            <span className="text-[#D1D5DB] text-sm block mb-1">Country</span>
                            <span className="text-[#FFFFFF]">{selectedOrder.country || "Not specified"}</span>
                          </div>
                          <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                            <span className="text-[#D1D5DB] text-sm block mb-1">Pincode</span>
                            <span className="text-[#FFFFFF] bg-[#1F2937]/50 px-2 py-1 rounded">{selectedOrder.pincode}</span>
                          </div>
                        </div>
                        <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                          <span className="text-[#D1D5DB] text-sm block mb-2">Phone</span>
                          <span className="text-[#FFFFFF] flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {selectedOrder.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tracking Section */}
                <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("tracking")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[#374151 ] transition-colors duration-300"
                  >
                    <span className="font-semibold text-[#FFFFFF] flex items-center gap-3">
                      <div className="p-2 bg-[#22C55E] rounded-lg">
                        <Truck className="h-5 w-5 text-[#D1D5DB]" />
                      </div>
                      Tracking & Timeline
                    </span>
                    {isSectionExpanded("tracking") ? (
                      <ChevronUp className="h-5 w-5 text-[#D1D5DB]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#D1D5DB]" />
                    )}
                  </button>
                  {isSectionExpanded("tracking") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[#374151]">
                      <div className="space-y-6 mt-4 md:mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                            <span className="text-[#D1D5DB] text-sm block mb-1">Carrier</span>
                            <span className="text-[#FFFFFF]">{selectedOrder.shippingCarrier || "Not assigned"}</span>
                          </div>
                          <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                            <span className="text-[#D1D5DB] text-sm block mb-1">Tracking Number</span>
                            <span className="text-[#FFFFFF] font-mono bg-[#1F2937]/50 px-2 py-1 rounded text-sm break-all">
                              {selectedOrder.trackingNumber || "Not available"}
                            </span>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div>
                          <span className="text-[#D1D5DB] text-lg font-semibold block mb-4">Order Timeline</span>
                          <div className="space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="w-3 h-3 bg-[#22C55E] rounded-full mt-1 flex-shrink-0"></div>
                              <div className="flex-1">
                                <span className="text-[#FFFFFF] font-medium block">Order Placed</span>
                                <span className="text-[#D1D5DB] text-sm">{formatDate(selectedOrder.orderDate)}</span>
                              </div>
                            </div>
                            {selectedOrder.shippedDate && (
                              <div className="flex items-start gap-4">
                                <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <span className="text-[#FFFFFF] font-medium block">Shipped</span>
                                  <span className="text-[#D1D5DB] text-sm">{formatDate(selectedOrder.shippedDate)}</span>
                                </div>
                              </div>
                            )}
                            {selectedOrder.deliveredDate && (
                              <div className="flex items-start gap-4">
                                <div className="w-3 h-3 bg-green-400 rounded-full mt-1 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <span className="text-[#FFFFFF] font-medium block">Delivered</span>
                                  <span className="text-[#D1D5DB] text-sm">
                                    {formatDate(selectedOrder.deliveredDate)}
                                  </span>
                                </div>
                              </div>
                            )}
                            {selectedOrder.estimatedDeliveryDate && (
                              <div className="flex items-start gap-4">
                                <div className="w-3 h-3 bg-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <span className="text-[#FFFFFF] font-medium block">Estimated Delivery</span>
                                  <span className="text-[#D1D5DB] text-sm">
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
                <div className="bg-[#111827]  backdrop-blur-md border border-[#374151] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("additional")}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[#374151 ] transition-colors duration-300"
                  >
                    <span className="font-semibold text-[#FFFFFF] flex items-center gap-3">
                      <div className="p-2 bg-[#22C55E] rounded-lg">
                        <FileText className="h-5 w-5 text-[#D1D5DB]" />
                      </div>
                      Additional Information
                    </span>
                    {isSectionExpanded("additional") ? (
                      <ChevronUp className="h-5 w-5 text-[#D1D5DB]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#D1D5DB]" />
                    )}
                  </button>
                  {isSectionExpanded("additional") && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[#374151]">
                      <div className="space-y-4 mt-4 md:mt-6">
                        <div>
                          <span className="text-[#D1D5DB] text-sm block mb-2">Special Notes</span>
                          {selectedOrder.notes ? (
                            <p className="text-[#FFFFFF] bg-[#374151 ] p-3 md:p-4 rounded-xl">{selectedOrder.notes}</p>
                          ) : (
                            <p className="text-[#D1D5DB] italic">No special instructions</p>
                          )}
                        </div>
                        {selectedOrder.locationDetails && Object.keys(selectedOrder.locationDetails).length > 0 && (
                          <div>
                            <span className="text-[#D1D5DB] text-sm block mb-2">Location Details</span>
                            <div className="bg-[#374151 ] p-3 md:p-4 rounded-xl">
                              <pre className="text-sm text-[#D1D5DB] whitespace-pre-wrap overflow-x-auto">
                                {JSON.stringify(selectedOrder.locationDetails, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                        <div className="bg-[#374151 ] rounded-xl p-3 md:p-4">
                          <span className="text-[#D1D5DB] text-sm block mb-1">Last Updated</span>
                          <span className="text-[#FFFFFF] text-sm">{formatDate(selectedOrder.updatedAt)}</span>
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
                <Package className="h-16 w-16 text-[#D1D5DB] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">Select an Order</h3>
                <p className="text-[#D1D5DB]">Choose an order from the left to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
