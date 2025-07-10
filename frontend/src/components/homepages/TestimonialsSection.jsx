"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, Verified } from "lucide-react"

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Organic Farmer",
      location: "Punjab, India",
      image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=f59e0b&color=000",
      rating: 5,
      text: "AgroLink transformed my farming business! Direct connection with buyers increased my profits by 40%. The platform is user-friendly and the support team is amazing.",
      highlight: "40% profit increase",
      verified: true,
    },
    {
      name: "Priya Sharma",
      role: "Health Conscious Consumer",
      location: "Mumbai, India",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=f59e0b&color=000",
      rating: 5,
      text: "Fresh, organic vegetables delivered to my doorstep within hours! The quality is exceptional and knowing it comes directly from farmers makes it even better.",
      highlight: "Same-day delivery",
      verified: true,
    },
    {
      name: "Amit Patel",
      role: "Restaurant Owner",
      location: "Delhi, India",
      image: "https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=000",
      rating: 5,
      text: "Bulk ordering for my restaurant has never been easier. Consistent quality, competitive prices, and reliable delivery. AgroLink is a game-changer for the food industry.",
      highlight: "Bulk ordering made easy",
      verified: true,
    },
    {
      name: "Sunita Devi",
      role: "Small Scale Farmer",
      location: "Haryana, India",
      image: "https://ui-avatars.com/api/?name=Sunita+Devi&background=f59e0b&color=000",
      rating: 5,
      text: "As a small farmer, I struggled to find good buyers. AgroLink connected me with premium customers who value quality. My income has doubled in just 6 months!",
      highlight: "Income doubled",
      verified: true,
    },
    {
      name: "Dr. Vikram Singh",
      role: "Nutritionist",
      location: "Bangalore, India",
      image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=f59e0b&color=000",
      rating: 5,
      text: "I recommend AgroLink to all my patients. The organic certification and freshness guarantee ensure they get the most nutritious produce available.",
      highlight: "Doctor recommended",
      verified: true,
    },
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentData = testimonials[currentTestimonial]

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Testimonial Wave Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,300 Q300,100 600,300 T1200,300 L1200,600 L0,600 Z"
            fill="url(#testimonialWave1)"
            className="animate-testimonial-wave-1"
          />
          <path
            d="M0,350 Q200,150 400,350 T800,350 Q1000,150 1200,350 L1200,600 L0,600 Z"
            fill="url(#testimonialWave2)"
            className="animate-testimonial-wave-2"
          />

          <defs>
            <linearGradient id="testimonialWave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.2)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.05)" />
            </linearGradient>
            <linearGradient id="testimonialWave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.15)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.03)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Quote Marks */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-testimonial-float opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              <Quote className="w-6 h-6 text-yellow-400" />
            </div>
          ))}
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-yellow-400/10 to-transparent rounded-full animate-testimonial-glow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-radial from-yellow-400/8 to-transparent rounded-full animate-testimonial-glow-delayed blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            💬 Customer Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              What Our Community Says
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real stories from farmers and customers who have transformed their agricultural journey with AgroLink
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-black" />
            </div>

            {/* Content */}
            <div className="relative pt-8">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentData.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8 font-medium">
                "{currentData.text}"
              </blockquote>

              {/* Highlight Badge */}
              <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30 px-4 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
                ✨ {currentData.highlight}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={currentData.image || "/placeholder.svg"}
                    alt={currentData.name}
                    className="w-16 h-16 rounded-full border-2 border-yellow-400/50 shadow-lg"
                  />
                  {currentData.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <Verified className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{currentData.name}</h4>
                  <p className="text-yellow-400 font-medium">{currentData.role}</p>
                  <p className="text-gray-400 text-sm">{currentData.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/50 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/50 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="text-center">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isAutoPlaying
                ? "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30"
                : "bg-gray-800/50 text-gray-400 border border-gray-700/50"
            } backdrop-blur-sm hover:scale-105`}
          >
            {isAutoPlaying ? "⏸️ Pause Auto-play" : "▶️ Resume Auto-play"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes testimonial-wave-1 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-25px) scaleY(1.1); }
        }

        @keyframes testimonial-wave-2 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(35px) scaleY(0.9); }
        }

        @keyframes testimonial-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.3; }
        }

        @keyframes testimonial-glow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }

        @keyframes testimonial-glow-delayed {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.05); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-testimonial-wave-1 { animation: testimonial-wave-1 14s ease-in-out infinite; }
        .animate-testimonial-wave-2 { animation: testimonial-wave-2 10s ease-in-out infinite reverse; }
        .animate-testimonial-float { animation: testimonial-float 8s ease-in-out infinite; }
        .animate-testimonial-glow { animation: testimonial-glow 7s ease-in-out infinite; }
        .animate-testimonial-glow-delayed { animation: testimonial-glow-delayed 9s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  )
}

export default TestimonialsSection
