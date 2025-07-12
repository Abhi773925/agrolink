import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component imports
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import FarmerDashboard from "./components/FarmerDashboard";
import FarmerProduct from "./components/FarmerProduct";
import Product from "./components/Product";
import AddToCart from "./components/AddToCart";

const App = () => {
  return (
    <Router>
      <div >
        {/* Navbar shown on all pages */}
        <Navbar />

        {/* Main content */}
        <main className="">
          <Routes>
            <Route path="/overview" element={<AdminDashboard />} />
            <Route path="/all-farmers" element={<FarmerDashboard />} />
            <Route path="/farmer-products" element={<FarmerProduct/>} />
            <Route path="/all-listings" element={<Product/>}/>
            <Route path='cart/:id' element={<AddToCart/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
