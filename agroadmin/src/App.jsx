import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import FarmerDashboard from "./components/FarmerDashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/overview" element={<AdminDashboard />} />
          <Route path="/all-farmers" element={<FarmerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
