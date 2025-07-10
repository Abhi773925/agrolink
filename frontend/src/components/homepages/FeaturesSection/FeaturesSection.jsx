"use client"

import { useState } from "react"
import { Truck, Shield, Clock, Users, Leaf, TrendingUp, Zap, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null)
const navigate=useNavigate();
  const gotologin=()=>{
    navigate('/login');
  }
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Direct farm-to-door delivery within 24 hours across major cities",
      color: "from-blue-400 to-blue-600",
      stats: "24hrs",
      delay: "0ms",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "100% organic certification with rigorous quality testing",
      color: "from-green-400 to-green-600",
      stats: "100%",
      delay: "200ms",
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your orders from harvest to your doorstep",
      color: "from-purple-400 to-purple-600",
      stats: "Live",
      delay: "400ms",
    },
    {
      icon: Users,
      title: "Farmer Network",
      description: "Connect with 10,000+ verified farmers nationwide",
      color: "from-orange-400 to-orange-600",
      stats: "10K+",
      delay: "600ms",
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Eco-friendly practices for a greener tomorrow",
      color: "from-emerald-400 to-emerald-600",
      stats: "Eco",
      delay: "800ms",
    },
    {
      icon: TrendingUp,
      title: "Best Prices",
      description: "Competitive pricing with direct farmer connections",
      color: "from-yellow-400 to-yellow-600",
      stats: "30%↓",
      delay: "1000ms",
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flowing Wave Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,300 Q200,100 400,300 T800,300 Q1000,100 1200,300 L1200,600 L0,600 Z"
            fill="url(#featureWave1)"
            className="animate-feature-wave-1"
          />
          <path
            d="M0,350 Q150,150 300,350 T600,350 Q750,150 900,350 T1200,350 L1200,600 L0,600 Z"
            fill="url(#featureWave2)"
            className="animate-feature-wave-2"
          />

          <defs>
            <linearGradient id="featureWave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.15)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.05)" />
            </linearGradient>
            <linearGradient id="featureWave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.1)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.03)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-feature-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-400/10 to-transparent rounded-full animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-400/8 to-transparent rounded-full animate-pulse-slow-delayed blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Zap className="inline w-4 h-4 mr-2" />
            Why Choose AgroLink
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Revolutionary Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of agriculture with our cutting-edge platform designed for modern farmers and
            conscious consumers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8 hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: feature.delay }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Animated Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500 blur-xl`}
              ></div>

              {/* Feature Icon */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Stats Badge */}
                <div
                  className={`absolute -top-2 -right-2 bg-gradient-to-r ${feature.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300`}
                >
                  {feature.stats}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl`}
              ></div>

              {/* Floating Particles on Hover */}
              {hoveredFeature === index && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full animate-feature-particle`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "1200ms" }} onClick={gotologin}>
          <button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-yellow-400/30 group relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Experience AgroLink Today
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes feature-wave-1 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          50% { transform: translateX(-30px) translateY(-15px) scaleY(1.1); }
        }

        @keyframes feature-wave-2 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          50% { transform: translateX(40px) translateY(20px) scaleY(0.9); }
        }

        @keyframes feature-float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 0.8; }
        }

        @keyframes feature-particle {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          100% { transform: translateY(-30px) scale(1); opacity: 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-feature-wave-1 { animation: feature-wave-1 10s ease-in-out infinite; }
        .animate-feature-wave-2 { animation: feature-wave-2 8s ease-in-out infinite reverse; }
        .animate-feature-float { animation: feature-float 6s ease-in-out infinite; }
        .animate-feature-particle { animation: feature-particle 1s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 5s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  )
}

export default FeaturesSection
