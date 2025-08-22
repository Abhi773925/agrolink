"use client"

import { useState } from "react"
import { Truck, Shield, Clock, Users, Leaf, TrendingUp, Heart, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const FeaturesSection = () => {
  const navigate = useNavigate()
  const gotologin = () => navigate('/login')

  const features = [
    { icon: Truck, title: "Fast Delivery", description: "Direct farm-to-door delivery within 24 hours across major cities", stats: "24hrs" },
    { icon: Shield, title: "Quality Assured", description: "100% organic certification with rigorous quality testing", stats: "100%" },
    { icon: Clock, title: "Real-time Tracking", description: "Track your orders from harvest to your doorstep", stats: "Live" },
    { icon: Users, title: "Farmer Network", description: "Connect with 10,000+ verified farmers nationwide", stats: "10K+" },
    { icon: Leaf, title: "Sustainable Farming", description: "Eco-friendly practices for a greener tomorrow", stats: "Eco" },
    { icon: TrendingUp, title: "Best Prices", description: "Competitive pricing with direct farmer connections", stats: "30%↓" },
  ]

  return (
    <section className="relative bg-[#111827] py-20 overflow-hidden">
      <div className="relative container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1F2937] text-[#FFFFFF] border border-[#374151] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Zap className="inline w-4 h-4 mr-2" />
            Why Choose AgroLink
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6">
            Revolutionary Features
          </h2>
          <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto leading-relaxed">
            Experience the future of agriculture with our cutting-edge platform designed for modern farmers and conscious consumers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-[#1F2937] border border-[#374151] rounded-2xl p-8"
            >
              {/* Feature Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-[#22C55E] rounded-2xl flex items-center justify-center shadow-lg">
                  <feature.icon className="w-8 h-8 text-[#FFFFFF]" />
                </div>

                {/* Stats Badge */}
                <div className="absolute -top-2 -right-2 bg-[#22C55E] text-[#FFFFFF] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {feature.stats}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">{feature.title}</h3>
                <p className="text-[#D1D5DB] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={gotologin}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-[#D1D5DB] px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Experience AgroLink Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
