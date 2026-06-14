import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageTransition from "./components/animations/PageTransition";
import FooterSection from "./components/homepages/FooterSection";
import HeroSection from "./components/homepages/HeroSection";
import FeaturesSection from "./components/homepages/FeaturesSection/FeaturesSection";
import HowItWorksSection from "./components/homepages/FeaturesSection/HowItWorksSection";
import Navbar from "./components/homepages/Navbar";
import StatsSection from "./components/homepages/StatsSection";
import TestimonialsSection from "./components/homepages/TestimonialsSection";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import AddToCart from "./components/marketplace/AddToCart";
import Checkout from "./components/marketplace/Checkout";
import Listing from "./components/marketplace/Listing";
import MyCrop from "./components/marketplace/MyCrop";
import Product from "./components/marketplace/Product";
import MyOrder from "./components/order/MyOrder";
import MyProfile from "./components/profile/MyProfile";
import ChatBox from "./components/resource/ChatBox";
import Weather from "./components/resource/Weather";

const App = () => {
  return (
    <PageTransition>
      <Router>
        <div className="min-h-screen bg-white text-gray-900">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeaturesSection />
                    <HowItWorksSection />
                    <StatsSection />
                    <TestimonialsSection />
                  </>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/marketplace" element={<Product />} />
              <Route path="/cart/:id" element={<AddToCart />} />
              <Route path="/mycrop" element={<MyCrop />} />
              <Route path="/checkout/:productId" element={<Checkout />} />
              <Route path="/chat" element={<ChatBox />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/myorders" element={<MyOrder />} />
            </Routes>
          </main>
          <FooterSection />
        </div>
      </Router>
    </PageTransition>
  );
};

export default App;
