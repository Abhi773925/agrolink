"use client"

import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom';
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate= useNavigate();
  const buy=()=>{
    navigate('/marketplace');
  }
  const slides = [
    {
      id: 1,
      title: "Connecting Farmers and Buyers",
      subtitle: "Bridging the gap between quality agricultural produce and market demand",
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      stats: { farmers: "10,000+", buyers: "5,000+", crops: "500+" },
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: 2,
      title: "Premium Quality Crops",
      subtitle: "Fresh, organic, and sustainably grown agricultural products",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      stats: { quality: "Grade A", organic: "100%", fresh: "Daily" },
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: 3,
      title: "Smart Agricultural Solutions",
      subtitle: "Technology-driven farming for better yields and sustainability",
      image:
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      stats: { tech: "AI-Powered", yield: "30% More", sustainable: "Eco-Friendly" },
      color: "from-yellow-400 to-yellow-600",
    },
  ]

  const categories = [
    { name: "Cereals", icon: "🌾", count: "150+ varieties", delay: "0ms" },
    { name: "Vegetables", icon: "🥕", count: "200+ varieties", delay: "200ms" },
    { name: "Fruits", icon: "🍎", count: "100+ varieties", delay: "400ms" },
    { name: "Pulses", icon: "🫘", count: "50+ varieties", delay: "600ms" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSlideChange = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      {/* Animated Sine Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Multiple Sine Waves */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wave 1 - Primary */}
          <path
            d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="url(#wave1)"
            className="animate-wave-1"
          />
          {/* Wave 2 - Secondary */}
          <path
            d="M0,450 Q200,250 400,450 T800,450 T1200,450 L1200,800 L0,800 Z"
            fill="url(#wave2)"
            className="animate-wave-2"
          />
          {/* Wave 3 - Tertiary */}
          <path
            d="M0,500 Q150,300 300,500 T600,500 T900,500 T1200,500 L1200,800 L0,800 Z"
            fill="url(#wave3)"
            className="animate-wave-3"
          />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.1)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.05)" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.08)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.03)" />
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.06)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.02)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-gray-700/30 to-gray-800/40 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-yellow-400/10 to-yellow-600/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse-slow"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative container mx-auto px-4 py-12 lg:py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div
              className={`space-y-6 transition-all duration-700 transform ${
                isTransitioning ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
              }`}
            >
              <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 animate-bounce-gentle backdrop-blur-sm">
                <span className="animate-pulse">🌱</span> Agricultural Excellence
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  {currentSlideData.title}
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed animate-fade-in-up">{currentSlideData.subtitle}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={buy}
                className={`bg-gradient-to-r ${currentSlideData.color} hover:shadow-2xl hover:shadow-yellow-400/30 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-lg group relative overflow-hidden`}
              >
                <span className="relative z-10">Start Buying</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300 hover:border-yellow-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 pt-8 transition-all duration-700 delay-300 transform ${
                isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
              }`}
            >
              {Object.entries(currentSlideData.stats).map(([key, value], index) => (
                <div key={key} className="text-center group">
                  <div
                    className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${currentSlideData.color} bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value}
                  </div>
                  <div className="text-sm text-gray-400 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div
              className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 transform ${
                isTransitioning ? "opacity-0 scale-95 rotate-1" : "opacity-100 scale-100 rotate-0"
              }`}
            >
              <img
                src={currentSlideData.image || "/placeholder.svg"}
                alt="Agricultural scene"
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} opacity-20 mix-blend-multiply`}
              ></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50 transform hover:scale-105 transition-all duration-300 animate-float-card">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${currentSlideData.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <span className="text-2xl animate-bounce-gentle">🌾</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Fresh Harvest</div>
                  <div className="text-sm text-gray-300">Daily Supply</div>
                </div>
              </div>
            </div>

            {/* Additional Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-float opacity-80">
              <span className="text-2xl">☀️</span>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-24">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Our Product Categories
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Discover our wide range of agricultural products sourced directly from farmers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-700/50 group animate-fade-in-up hover:bg-gray-800/70"
                style={{ animationDelay: category.delay }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count}</p>
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 mx-auto mt-3 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave-1 {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-25px) translateY(-10px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes wave-2 {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(25px) translateY(15px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes wave-3 {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-15px) translateY(-20px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-40px) translateX(-5px) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-20px) translateX(-15px) rotate(270deg);
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-30px, 30px) rotate(-120deg);
          }
          66% {
            transform: translate(20px, -20px) rotate(-240deg);
          }
        }

        @keyframes float-card {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-wave-1 {
          animation: wave-1 8s ease-in-out infinite;
        }

        .animate-wave-2 {
          animation: wave-2 12s ease-in-out infinite reverse;
        }

        .animate-wave-3 {
          animation: wave-3 15s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 15s ease-in-out infinite;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-float-card {
          animation: float-card 4s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </section>
  )
}

export default HeroSection;
