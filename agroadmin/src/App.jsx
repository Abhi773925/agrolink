"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Component imports
import Navbar from "./components/Navbar"
import AdminDashboard from "./components/AdminDashboard"
import FarmerDashboard from "./components/FarmerDashboard"
import FarmerProduct from "./components/FarmerProduct"
import Product from "./components/Product"
import AddToCart from "./components/AddToCart"
import HeroSection from "./components/HeroSection"
import Footer from "./components/Footer" // Assuming Footer is also a component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Log isLoggedIn state changes in App.tsx
  useEffect(() => {
    console.log("App.tsx - isLoggedIn state updated to:", isLoggedIn)
  }, [isLoggedIn])

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const adminLoginStatus = localStorage.getItem("adminlogin")
        if (adminLoginStatus === "true") {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
        // IMPORTANT: Ensure this line is NOT present: localStorage.setItem('adminlogin',true);
      } catch (error) {
        console.error("App.tsx - Error accessing localStorage:", error)
        setIsLoggedIn(false) // Default to not logged in if localStorage is inaccessible
      } finally {
        setIsLoading(false)
        console.log("App.tsx - Initial auth check complete. isLoading set to false.")
      }
    }
    checkAuthStatus()
  }, []) // Empty dependency array means it runs only once on mount

  if (isLoading) {
    // You can render a global loading spinner or skeleton here
    return (
      <div className="flex items-center justify-center min-h-screen  text-[#FFFFFF]">Loading application...</div>
    )
  }

  return (
    <Router>
      <div className=" flex flex-col">
        {/* Navbar shown on all pages */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Main content, conditionally rendered based on login status */}
        {isLoggedIn ? (
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/overview" element={<AdminDashboard />} />
              <Route path="/all-farmers" element={<FarmerDashboard />} />
              <Route path="/farmer-products" element={<FarmerProduct />} />
              <Route path="/all-listings" element={<Product />} />
              <Route path="/cart/:id" element={<AddToCart />} />
              {/* Add other routes here */}
            </Routes>
          </main>
        ) : (
          // This block is now handled by the Navbar's internal logic
          // when isLoggedIn is false and showPasskeyInput is false.
          // We keep the main content empty or show a generic message if not logged in
          // and the Navbar's overlay isn't active.
          <div className="flex-1 flex items-center justify-center text-[#FFFFFF]">
            {/* Content will be shown via Navbar's access restricted overlay */}
          </div>
        )}
        <Footer />
      </div>
    </Router>
  )
}

export default App
