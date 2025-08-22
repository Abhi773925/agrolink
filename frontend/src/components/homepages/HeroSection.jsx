"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate();

  const buy = () => {
    navigate('/marketplace');
  }

  const slides = [
    {
      id: 1,
      title: "Connecting Farmers and Buyers",
      subtitle: "Bridging the gap between quality agricultural produce and market demand",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    },
    {
      id: 2,
      title: "Premium Quality Crops",
      subtitle: "Fresh, organic, and sustainably grown agricultural products",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    },
    {
      id: 3,
      title: "Smart Agricultural Solutions",
      subtitle: "Technology-driven farming for better yields and sustainability",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    },
  ]

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative bg-[#111827] min-h-screen overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="relative container mx-auto px-4 py-12 lg:py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-[#FFFFFF] leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-xl text-[#D1D5DB] leading-relaxed">
              {currentSlideData.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={buy}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-[#D1D5DB] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
              >
                Start Buying
              </button>
              <button className="border-2 border-[#374151] text-[#FFFFFF] hover:bg-[#22C55E]/10 px-8 py-4 rounded-xl font-semibold text-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={currentSlideData.image || "/placeholder.svg"}
                alt="Agricultural scene"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-[#1F2937] rounded-2xl p-6 shadow-2xl border border-[#374151]">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <div className="font-semibold text-[#FFFFFF]">Fresh Harvest</div>
                  <div className="text-sm text-[#D1D5DB]">Daily Supply</div>
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center shadow-lg opacity-80">
              <span className="text-2xl">☀️</span>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#FFFFFF] mb-4">
              Our Product Categories
            </h2>
            <p className="text-[#D1D5DB] max-w-2xl mx-auto text-lg">
              Discover our wide range of agricultural products sourced directly from farmers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {["Cereals","Vegetables","Fruits","Pulses"].map((cat, idx) => (
              <div key={idx} className="bg-[#1F2937] rounded-2xl p-6 text-center border border-[#374151]">
                <div className="text-5xl mb-4">{["🌾","🥕","🍎","🫘"][idx]}</div>
                <h3 className="font-semibold text-[#FFFFFF] mb-2 text-lg">{cat}</h3>
                <p className="text-sm text-[#D1D5DB]">{["150+ varieties","200+ varieties","100+ varieties","50+ varieties"][idx]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;
