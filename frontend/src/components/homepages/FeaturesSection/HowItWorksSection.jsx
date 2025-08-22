"use client"

import { useState } from "react"
import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()
  const gottomarket = () => navigate('/marketplace')

  const steps = [
    {
      icon: Search,
      title: "Browse & Discover",
      description: "Explore our vast collection of fresh, organic produce from verified farmers",
      details: "Search by location, crop type, or farmer ratings. Filter by organic certification, price range, and delivery options.",
      number: "01",
    },
    {
      icon: ShoppingCart,
      title: "Select & Order",
      description: "Add your favorite products to cart and place your order with just a few clicks",
      details: "Secure checkout with multiple payment options. Schedule delivery at your convenience.",
      number: "02",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get fresh produce delivered directly from farm to your doorstep",
      details: "Real-time tracking, temperature-controlled transport, and 24-hour delivery guarantee.",
      number: "03",
    },
    {
      icon: CheckCircle,
      title: "Enjoy Fresh",
      description: "Enjoy the freshest, highest quality produce with complete satisfaction",
      details: "100% satisfaction guarantee with easy returns and customer support.",
      number: "04",
    },
  ]

  return (
    <section className="relative bg-[#111827] py-20 overflow-hidden">
      <div className="relative container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1F2937] text-[#FFFFFF] border border-[#374151] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            🚀 Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6">
            How AgroLink Works
          </h2>
          <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto leading-relaxed">
            From farm to table in 4 simple steps. Experience the easiest way to get fresh, organic produce delivered to your door.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => setActiveStep(index)}
            >
              {/* Step Card */}
              <div className="relative bg-[#1F2937] border border-[#374151] rounded-2xl p-8 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center text-[#FFFFFF] font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-[#22C55E] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="w-8 h-8 text-[#FFFFFF]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-[#FFFFFF]">{step.title}</h3>
                <p className="text-[#D1D5DB] mb-4 leading-relaxed">{step.description}</p>

                {/* Detailed Description */}
                {activeStep === index && (
                  <div>
                    <p className="text-sm text-[#D1D5DB] leading-relaxed">{step.details}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#FFFFFF] mb-4">Ready to Get Started?</h3>
          <p className="text-[#D1D5DB] text-lg mb-6">Join thousands of satisfied customers who trust AgroLink for their fresh produce needs</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={gottomarket}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-[#D1D5DB] px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Start Shopping Now
            </button>

            <button className="border-2 border-[#374151]/50 text-[#FFFFFF] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#22C55E]/10 hover:text-[#D1D5DB]">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
