"use client"

import { useState } from "react"
import { Search, ShoppingCart, Truck, CheckCircle, ArrowRight, Smartphone, CreditCard, Package } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0)
  const navigate=useNavigate();
  const gottomarket=()=>{
    navigate('/marketplace');
  }
  const steps = [
    {
      icon: Search,
      title: "Browse & Discover",
      description: "Explore our vast collection of fresh, organic produce from verified farmers",
      details:
        "Search by location, crop type, or farmer ratings. Filter by organic certification, price range, and delivery options.",
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-900/20 to-blue-800/20",
      number: "01",
    },
    {
      icon: ShoppingCart,
      title: "Select & Order",
      description: "Add your favorite products to cart and place your order with just a few clicks",
      details: "Secure checkout with multiple payment options. Schedule delivery at your convenience.",
      color: "from-green-400 to-green-600",
      bgColor: "from-green-900/20 to-green-800/20",
      number: "02",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get fresh produce delivered directly from farm to your doorstep",
      details: "Real-time tracking, temperature-controlled transport, and 24-hour delivery guarantee.",
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-900/20 to-purple-800/20",
      number: "03",
    },
    {
      icon: CheckCircle,
      title: "Enjoy Fresh",
      description: "Enjoy the freshest, highest quality produce with complete satisfaction",
      details: "100% satisfaction guarantee with easy returns and customer support.",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "from-yellow-900/20 to-yellow-800/20",
      number: "04",
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Complex Wave System */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,400 Q100,200 200,400 Q300,600 400,400 Q500,200 600,400 Q700,600 800,400 Q900,200 1000,400 Q1100,600 1200,400 L1200,800 L0,800 Z"
            fill="url(#workWave1)"
            className="animate-work-wave-1"
          />
          <path
            d="M0,450 Q150,250 300,450 T600,450 Q750,250 900,450 T1200,450 L1200,800 L0,800 Z"
            fill="url(#workWave2)"
            className="animate-work-wave-2"
          />

          <defs>
            <linearGradient id="workWave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.2)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.05)" />
            </linearGradient>
            <linearGradient id="workWave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.15)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.03)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Tech Elements */}
        <div className="absolute inset-0">
          {[Smartphone, CreditCard, Package].map((Icon, i) => (
            <div
              key={i}
              className="absolute animate-tech-float opacity-10"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 2}s`,
              }}
            >
              <Icon className="w-12 h-12 text-yellow-400" />
            </div>
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full animate-pulse-glow blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-radial from-yellow-400/10 to-transparent rounded-full animate-pulse-glow-delayed blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            🚀 Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              How AgroLink Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From farm to table in 4 simple steps. Experience the easiest way to get fresh, organic produce delivered to
            your door.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer transition-all duration-500 ${
                activeStep === index ? "scale-105" : "hover:scale-102"
              }`}
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Step Card */}
              <div
                className={`relative bg-gradient-to-br ${step.bgColor} backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8 h-full transition-all duration-500 ${
                  activeStep === index
                    ? "shadow-2xl shadow-yellow-400/20 border-yellow-400/50"
                    : "hover:shadow-xl hover:shadow-gray-900/50"
                }`}
              >
                {/* Step Number */}
                <div
                  className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform ${
                    activeStep === index ? "scale-110 rotate-12" : "group-hover:scale-105"
                  } transition-all duration-300`}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform ${
                    activeStep === index ? "scale-110 rotate-6" : "group-hover:scale-105"
                  } transition-all duration-500`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3
                  className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    activeStep === index ? "text-yellow-400" : "text-white group-hover:text-yellow-400"
                  }`}
                >
                  {step.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed">{step.description}</p>

                {/* Detailed Description */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeStep === index ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-400 leading-relaxed">{step.details}</p>
                </div>

                {/* Progress Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.color} transition-all duration-500 rounded-b-2xl ${
                    activeStep === index ? "w-full" : "w-0 group-hover:w-1/2"
                  }`}
                ></div>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight
                      className={`w-6 h-6 text-yellow-400 transition-all duration-300 ${
                        activeStep === index ? "scale-125 animate-pulse" : "opacity-50"
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div
          className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 lg:p-12 animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 text-lg">
              Join thousands of satisfied customers who trust AgroLink for their fresh produce needs
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={gottomarket} className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-yellow-400/30 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5"  />
                Start Shopping Now
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            <button className="border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300 hover:border-yellow-300 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes work-wave-1 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-20px) scaleY(1.1); }
        }

        @keyframes work-wave-2 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(30px) scaleY(0.9); }
        }

        @keyframes tech-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }

        @keyframes pulse-glow-delayed {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-work-wave-1 { animation: work-wave-1 12s ease-in-out infinite; }
        .animate-work-wave-2 { animation: work-wave-2 8s ease-in-out infinite reverse; }
        .animate-tech-float { animation: tech-float 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 6s ease-in-out infinite; }
        .animate-pulse-glow-delayed { animation: pulse-glow-delayed 7s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  )
}

export default HowItWorksSection
