import React, { useEffect, useState } from "react";
import { ShoppingCart, MapPin, Phone, CreditCard, Truck, Package, CheckCircle, AlertCircle, Info, Shield, Star, Clock, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  // Mock product ID for demonstration - replace with actual routing solution
  const {productId}=useParams();
  
  // State
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [locationDetails, setLocationDetails] = useState(null);
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [fetchingItem, setFetchingItem] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [toast, setToast] = useState(null); // Add toast state
  const navigate=useNavigate();
  // Get user email from localStorage
  const userEmail = localStorage?.getItem("email") || "user@example.com";

  // Toast function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // Hide after 5 seconds
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Fetch product details from API
  useEffect(() => {
    const getItem = async () => {
      try {
        setFetchingItem(true);
        const response = await fetch(`https://agrolink-5ok6.onrender.com/api/users/checkout/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setItem(data);
        setError("");
      } catch (error) {
        console.error('Error fetching product:', error);
        setError("Error fetching product details. Please try again.");
        showToast("Failed to load product details", 'error');
      } finally {
        setFetchingItem(false);
      }
    };
    
    if (productId) {
      getItem();
    }
  }, [productId]);

  // Fetch location details from pincode API
  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (orderSuccess) {
        orderSuccess();
        navigate('/');  // Navigate to the home page
        // Reload the window after navigate
        window.location.reload();
      }

      if (pincode.length === 6) {
        setLocationLoading(true);
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
          const data = await response.json();
          
          if (data[0]?.Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            setLocationDetails({
              city: postOffice.District,
              state: postOffice.State,
              country: postOffice.Country,
            });
          } else {
            setLocationDetails(null);
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          setLocationDetails(null);
        } finally {
          setLocationLoading(false);
        }
      } else {
        setLocationDetails(null);
      }
    };
    
    fetchLocationDetails();
  }, [pincode, orderSuccess]);

  // Create Razorpay order and handle payment - FIXED VERSION
  const handleRazorpayPayment = async (orderData) => {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      
      // Step 1: Create Razorpay order
      const razorpayOrderResponse = await fetch('https://agrolink-5ok6.onrender.com/api/users/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderData.amount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`
        }),
      });

      if (!razorpayOrderResponse.ok) {
        const errorData = await razorpayOrderResponse.json();
        throw new Error(errorData.message || 'Failed to create Razorpay order');
      }

      const razorpayOrder = await razorpayOrderResponse.json();

      // Step 2: Open Razorpay checkout
      const options = {
        key: "rzp_live_6E3S8Gv93lnB3Y", // Your Razorpay key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "AgroLink",
        description: `Purchase of ${item.name}`,
        order_id: razorpayOrder.orderId,
        handler: async (response) => {
          try {
            console.log('Payment successful, processing order...', response);
            
            // Step 3: Place order with payment details
            const finalOrderResponse = await fetch('https://agrolink-5ok6.onrender.com/api/users/order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...orderData,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              }),
            });

            if (!finalOrderResponse.ok) {
              const errorData = await finalOrderResponse.json();
              throw new Error(errorData.message || 'Failed to complete order');
            }

            const result = await finalOrderResponse.json();
            
            // ✅ SUCCESS: Show toast and update UI
            showToast("🎉 Payment successful! Order placed successfully!", 'success');
            setOrderSuccess(true);
            setOrderDetails(result.orderDetails);
            setError("");
            
            console.log('Order completed successfully:', result);
            
          } catch (error) {
            console.error('Error completing order:', error);
            setError("Payment successful but order completion failed. Please contact support.");
            showToast("Order completion failed. Please contact support.", 'error');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          email: userEmail,
          contact: phone,
        },
        theme: {
          color: "#facc15", // Yellow-400
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment cancelled by user");
            showToast("Payment cancelled", 'error');
          }
        }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', (response) => {
          console.error('Payment failed:', response);
          setError(`Payment failed: ${response.error.description}`);
          showToast(`Payment failed: ${response.error.description}`, 'error');
          setLoading(false);
        });
        
        rzp.open();
      } else {
        throw new Error("Razorpay not loaded");
      }
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError(error.message || "Failed to initiate payment. Please try again.");
      showToast("Failed to initiate payment. Please try again.", 'error');
      setLoading(false);
    }
  };

  // Handle COD order - FIXED VERSION
  const handleCODOrder = async (orderData) => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch('https://agrolink-5ok6.onrender.com/api/users/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const result = await response.json();
      
      // ✅ SUCCESS: Show toast and update UI
      showToast("🎉 Order placed successfully! You will pay cash on delivery.", 'success');
      setOrderSuccess(true);
      setOrderDetails(result.orderDetails);
      setError("");
      
    } catch (error) {
      console.error('Error placing COD order:', error);
      setError("Failed to place order. Please try again.");
      showToast("Failed to place order. Please try again.", 'error');
    } finally {
      setLoading(false);
    }
  };

  // Main order handler
  const handleOrder = async () => {
    if (!userEmail) {
      setError("You must be logged in to place an order.");
      showToast("You must be logged in to place an order.", 'error');
      return;
    }
    
    if (!address || !phone || !pincode) {
      setError("Please fill all required fields.");
      showToast("Please fill all required fields.", 'error');
      return;
    }

    if (!item) {
      setError("Product information not available.");
      showToast("Product information not available.", 'error');
      return;
    }

    if (quantity > item.quantity) {
      setError(`Only ${item.quantity} items available in stock.`);
      showToast(`Only ${item.quantity} items available in stock.`, 'error');
      return;
    }

    if (phone.length < 10) {
      setError("Please enter a valid phone number.");
      showToast("Please enter a valid phone number.", 'error');
      return;
    }

    if (pincode.length !== 6) {
      setError("Please enter a valid 6-digit PIN code.");
      showToast("Please enter a valid 6-digit PIN code.", 'error');
      return;
    }

    const orderData = {
      userEmail,
      productId: productId,
      quantity,
      address,
      pincode,
      phone,
      paymentMethod,
      locationDetails,
      amount: item.price * quantity
    };

    setError("");

    if (paymentMethod === "COD") {
      await handleCODOrder(orderData);
    } else {
      await handleRazorpayPayment(orderData);
    }
  };

  // Toast Component
  const Toast = ({ message, type, onClose }) => (
    <div className={`fixed top-4 right-4 z-50000 p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-md ${
      type === 'success' 
        ? 'bg-[#111827]  border-[#374151] text-[#FFFFFF]' 
        : 'bg-[#111827]  border-red-400 text-[#FFFFFF]'
    } animate-slide-in`}>
      <div className="flex items-center space-x-2">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-[#FFFFFF]" />
        ) : (
          <AlertCircle className="w-5 h-5 text-[#F87171]" />
        )}
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-2 text-[#D1D5DB] hover:text-[#FFFFFF] transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );

  // Success screen
  if (orderSuccess && orderDetails) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#111827]  backdrop-blur-md rounded-2xl shadow-2xl border border-[#374151] p-8 text-center">
          <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#22C55E]/20">
            <CheckCircle className="w-8 h-8 text-[#D1D5DB]" />
          </div>
          <h2 className="text-2xl font-bold text-[#FFFFFF] mb-2">Order Placed Successfully!</h2>
          <p className="text-[#D1D5DB] mb-6">Thank you for your purchase. Your order has been confirmed.</p>
          
          <div className="bg-[#374151 ] backdrop-blur-md rounded-xl p-4 mb-6 text-left border border-[#374151]/50">
            <h3 className="font-semibold text-[#FFFFFF] mb-2">Order Details</h3>
            <div className="space-y-1 text-sm text-[#D1D5DB]">
              <p><span className="font-medium text-[#FFFFFF]">Order ID:</span> {orderDetails.orderId}</p>
              <p><span className="font-medium text-[#FFFFFF]">Product:</span> {orderDetails.productName}</p>
              <p><span className="font-medium text-[#FFFFFF]">Quantity:</span> {orderDetails.quantity}</p>
              <p><span className="font-medium text-[#FFFFFF]">Total Amount:</span> ₹{orderDetails.totalAmount}</p>
              <p><span className="font-medium text-[#FFFFFF]">Payment Method:</span> {orderDetails.paymentMethod}</p>
              <p><span className="font-medium text-[#FFFFFF]">Status:</span> 
                <span className="ml-1 px-2 py-1 bg-[#22C55E]/20 text-[#FFFFFF] rounded text-xs border border-[#374151]">
                  {orderDetails.orderStatus}
                </span>
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-[#22C55E] text-[#D1D5DB] font-semibold py-3 px-6 rounded-xl hover:bg-[#374151 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-[#22C55E]/20"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Helper function to get stock status
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: "Out of Stock", color: "text-[#F87171] bg-red-400/10 border-red-400/30", icon: "⚠️" };
    if (quantity <= 5) return { text: `Only ${quantity} left`, color: "text-[#FFFFFF] bg-[#22C55E]/10 border-[#374151]", icon: "⚡" };
    if (quantity <= 10) return { text: `${quantity} in stock`, color: "text-[#FFFFFF] bg-[#22C55E]/10 border-[#374151]", icon: "📦" };
    return { text: `${quantity} in stock`, color: "text-[#FFFFFF] bg-[#22C55E]/10 border-[#374151]", icon: "✅" };
  };

  const totalPrice = item?.price * quantity || 0;
  const maxQuantity = item?.quantity || 0;
  const savings = Math.floor(totalPrice * 0.15);

  return (
    <div className="min-h-screen bg-[#111827] backdrop-blur-md">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Summary - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Card */}
            <div className="bg-[#111827]  backdrop-blur-md rounded-2xl shadow-2xl border border-[#374151] overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-[#FFFFFF]" />
                  Order Summary
                </h2>

                {fetchingItem ? (
                  <div className="animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 bg-[#374151 ] rounded-xl"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-[#374151 ] rounded w-3/4"></div>
                        <div className="h-4 bg-[#374151 ] rounded w-1/2"></div>
                        <div className="h-6 bg-[#374151 ] rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ) : item ? (
                  <div>
                    <div className="flex space-x-6 mb-6">
                      <div className="relative">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop"
                          }
                          alt={item.name}
                          className="w-24 h-24 rounded-xl object-cover border-2 border-[#374151]/50"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop";
                          }}
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#374151] rounded-full flex items-center justify-center shadow-lg shadow-[#22C55E]/20">
                          <Heart className="w-3 h-3 text-[#22C55E]" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#FFFFFF] mb-1">
                          {item.name}
                        </h3>
                        <p className="text-[#D1D5DB] text-sm mb-2">
                          {item.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(4.8)
                                    ? "text-[#FFFFFF] fill-current"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-[#D1D5DB]">
                            (127 reviews)
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-[#FFFFFF]">
                              ₹{item.price}
                            </span>
                            <span className="text-sm text-[#D1D5DB] line-through">
                              ₹{Math.floor(item.price * 1.2)}
                            </span>
                          </div>

                          {item.quantity !== undefined && (
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                                getStockStatus(item.quantity).color
                              }`}
                            >
                              <span className="mr-1">
                                {getStockStatus(item.quantity).icon}
                              </span>
                              {getStockStatus(item.quantity).text}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="border-t border-[#374151]/50 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                            Quantity
                          </label>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                              }
                              disabled={quantity <= 1}
                              className="w-10 h-10 rounded-full bg-[#374151 ] hover:bg-[#374151]/50 text-[#D1D5DB] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-[#374151]/50"
                            >
                              -
                            </button>
                            <div className="w-16 h-10 bg-[#374151 ] rounded-lg flex items-center justify-center border border-[#374151]/50">
                              <span className="text-lg font-semibold text-[#FFFFFF]">
                                {quantity}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                setQuantity(Math.min(maxQuantity, quantity + 1))
                              }
                              disabled={
                                quantity >= maxQuantity || maxQuantity === 0
                              }
                              className="w-10 h-10 rounded-full bg-[#374151 ] hover:bg-[#374151]/50 text-[#D1D5DB] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-[#374151]/50"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-[#D1D5DB]">Subtotal</p>
                          <p className="text-2xl font-bold text-[#FFFFFF]">
                            ₹{totalPrice}
                          </p>
                        </div>
                      </div>

                      {maxQuantity > 0 && (
                        <div className="flex items-center mt-3 text-sm text-[#D1D5DB]">
                          <Info className="w-4 h-4 mr-1" />
                          <span>Maximum {maxQuantity} items available</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-[#F87171] mx-auto mb-4" />
                    <p className="text-[#D1D5DB] mb-4">
                      Failed to load product details
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-[#22C55E] text-[#D1D5DB] rounded-lg hover:bg-[#374151 transition-all duration-200 font-semibold shadow-lg shadow-[#22C55E]/20"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Form */}
            <div className="bg-[#111827]  backdrop-blur-md rounded-2xl shadow-2xl border border-[#374151] overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#FFFFFF]" />
                  Delivery Information
                </h2>

                {error && (
                  <div className="flex items-center space-x-2 p-4 bg-red-400/10 border border-red-400/30 rounded-xl mb-6 backdrop-blur-md">
                    <AlertCircle className="w-5 h-5 text-[#F87171]" />
                    <p className="text-[#F87171] font-medium">{error}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-4 bg-[#374151 ] border border-[#374151]/50 rounded-xl focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E]/50 transition-all resize-none text-[#FFFFFF] placeholder-[#D1D5DB] backdrop-blur-md"
                      placeholder="Enter your complete farming address..."
                      rows="3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                        PIN Code *
                      </label>
                      <input
                        value={pincode}
                        onChange={(e) =>
                          setPincode(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full p-4 bg-[#374151 ] border border-[#374151]/50 rounded-xl focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E]/50 transition-all text-[#FFFFFF] placeholder-[#D1D5DB] backdrop-blur-md"
                        placeholder="Enter PIN code"
                        maxLength="6"
                        required
                      />
                      {locationLoading && pincode.length === 6 && (
                        <div className="flex items-center mt-2 text-sm text-[#D1D5DB]">
                          <div className="w-4 h-4 border-2 border-gray-600 border-t-yellow-400 rounded-full animate-spin mr-2"></div>
                          Verifying location...
                        </div>
                      )}
                      {locationDetails && !locationLoading && (
                        <div className="flex items-center space-x-1 mt-2">
                          <CheckCircle className="w-4 h-4 text-[#FFFFFF]" />
                          <p className="text-[#FFFFFF] text-sm">
                            {locationDetails.city}, {locationDetails.state}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                        Phone Number *
                      </label>
                      <input
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full p-4 bg-[#374151 ] border border-[#374151]/50 rounded-xl focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E]/50 transition-all text-[#FFFFFF] placeholder-[#D1D5DB] backdrop-blur-md"
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#111827]  backdrop-blur-md rounded-2xl shadow-2xl border border-[#374151] overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-[#FFFFFF]" />
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      value: "COD",
                      label: "Cash on Delivery",
                      icon: Truck,
                      color: "yellow",
                      desc: "Pay when you receive",
                    },
                    {
                      value: "UPI",
                      label: "UPI Payment",
                      icon: CreditCard,
                      color: "yellow",
                      desc: "Instant & secure",
                    },
                  ].map((method) => (
                    <label key={method.value} className="cursor-pointer group">
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 border-2 rounded-xl transition-all duration-200 backdrop-blur-md ${
                          paymentMethod === method.value
                            ? "border-[#374151] bg-[#22C55E]/10 shadow-lg shadow-[#22C55E]/20"
                            : "border-[#374151]/50 bg-[#374151 ] hover:border-gray-600/50 hover:bg-[#374151]/50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <method.icon
                            className={`w-5 h-5 ${
                              paymentMethod === method.value
                                ? "text-[#FFFFFF]"
                                : "text-[#D1D5DB]"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-[#FFFFFF]">
                              {method.label}
                            </p>
                            <p className="text-sm text-[#D1D5DB]">
                              {method.desc}
                            </p>
                          </div>
                          {paymentMethod === method.value && (
                            <CheckCircle className="w-5 h-5 text-[#FFFFFF]" />
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-[#111827]  backdrop-blur-md rounded-2xl shadow-lg border border-[#374151] sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#D1D5DB]">Subtotal</span>
                    <span className="font-medium text-[#FFFFFF]">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#D1D5DB]">Delivery</span>
                    <span className="font-medium text-[#FFFFFF]">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#D1D5DB]">You Save</span>
                    <span className="font-medium text-[#FFFFFF]">
                      ₹{savings}
                    </span>
                  </div>
                  <div className="border-t border-[#374151]/50 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-[#FFFFFF]">
                        Total
                      </span>
                      <span className="text-lg font-bold text-[#FFFFFF]">
                        ₹{totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-[#374151 ] rounded-xl p-4 mb-6 border border-[#374151]/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-[#FFFFFF]" />
                    <span className="text-sm font-medium text-[#FFFFFF]">
                      Expected Delivery
                    </span>
                  </div>
                  <p className="text-sm text-[#D1D5DB]">3-5 business days</p>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handleOrder}
                  disabled={
                    loading ||
                    !item ||
                    item.quantity === 0 ||
                    !address ||
                    !phone ||
                    !pincode
                  }
                  className="w-full bg-[#22C55E] text-[#FFFFFF] font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-[#22C55E]/20"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : item?.quantity === 0 ? (
                    <div className="flex items-center justify-center space-x-2">
                      <AlertCircle className="w-5 h-5" />
                      <span>Out of Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>
                        {paymentMethod === "COD" ? "Place Order" : "Pay Now"} •
                        ₹{totalPrice}
                      </span>
                    </div>
                  )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-[#D1D5DB]">
                  <Shield className="w-4 h-4" />
                  <span>Secure & encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;