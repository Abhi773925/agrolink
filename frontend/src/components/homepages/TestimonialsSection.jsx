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

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  const currentData = testimonials[currentTestimonial]

  return (
    <section className="bg-[#111827] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1F2937] text-[#FFFFFF] border border-[#374151] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            💬 Customer Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6">
            What Our Community Says
          </h2>
          <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto leading-relaxed">
            Real stories from farmers and customers who have transformed their agricultural journey with AgroLink
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12 bg-[#1F2937] border border-[#374151] rounded-3xl p-8 lg:p-12">
          <div className="pt-8">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(currentData.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#FACC15] fill-current" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-xl lg:text-2xl text-[#FFFFFF] leading-relaxed mb-8 font-medium">
              "{currentData.text}"
            </blockquote>

            {/* Highlight */}
            <div className="inline-block bg-[#22C55E] text-[#FFFFFF] px-4 py-2 rounded-full text-sm font-semibold mb-8">
              ✨ {currentData.highlight}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={currentData.image || "/placeholder.svg"}
                  alt={currentData.name}
                  className="w-16 h-16 rounded-full border-2 border-[#FACC15]"
                />
                {currentData.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <Verified className="w-3 h-3 text-[#FFFFFF]" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-[#FFFFFF] font-bold text-lg">{currentData.name}</h4>
                <p className="text-[#FFFFFF] font-medium">{currentData.role}</p>
                <p className="text-[#D1D5DB] text-sm">{currentData.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-[#1F2937] border border-[#374151] rounded-full flex items-center justify-center text-[#FFFFFF]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentTestimonial ? "bg-[#FACC15]" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-[#1F2937] border border-[#374151] rounded-full flex items-center justify-center text-[#FFFFFF]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="text-center">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-6 py-3 rounded-xl font-medium border ${
              isAutoPlaying
                ? "bg-[#FACC15] text-[#111827] border-[#FACC15]"
                : "bg-[#374151] text-[#D1D5DB] border-[#374151]"
            }`}
          >
            {isAutoPlaying ? "⏸️ Pause Auto-play" : "▶️ Resume Auto-play"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
