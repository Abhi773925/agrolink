import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/homepages/Navbar";
import HeroSection from "./components/homepages/HeroSection";
import Signup from "./components/login/Signup";
import Login from "./components/login/Login";
import MyProfile from "./components/profile/MyProfile";
import Listing from "./components/marketplace/Listing";
import Product from "./components/marketplace/Product";
import AddToCart from "./components/marketplace/AddToCart";
import MyCrop from "./components/marketplace/MyCrop";
import Checkout from "./components/marketplace/Checkout";
import ChatBox from "./components/resource/ChatBox";
import Weather from "./components/resource/Weather";
import FeaturesSection from "./components/homepages/FeaturesSection/FeaturesSection";
import StatsSection from "./components/homepages/StatsSection";
import TestimonialsSection from "./components/homepages/TestimonialsSection";
import HowItWorksSection from './components/homepages/FeaturesSection/HowItWorksSection';
import FooterSection from "./components/homepages/FooterSection";
import MyOrder from "./components/order/MyOrder";
import PageTransition from "./components/animations/PageTransition";
import Notifications from "./components/homepages/Notifications";
const App = () => {
  return (
   <PageTransition>
     <Router>
      <div className=" min-h-screen relative ">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        
        {/* Routed content with padding */}
        <div className="pt-16">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection /> <FeaturesSection />
                    <HowItWorksSection/>
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
            <Route path="/myorders" element={<MyOrder/>}/>
          </Routes>
        </div>
        <FooterSection/>
      </div>
    </Router>
   </PageTransition>
  );
};

export default App;
