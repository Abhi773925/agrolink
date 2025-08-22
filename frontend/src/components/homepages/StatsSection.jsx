"use client"

import { useState, useEffect } from "react"
import { Users, ShoppingBag, Truck, Award, TrendingUp, Globe, Leaf, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"

const StatsSection = () => {
  const [counters, setCounters] = useState({
    farmers: 0,
    orders: 0,
    deliveries: 0,
    satisfaction: 0,
  })

  const stats = [
    { icon: Users, label: "Active Farmers", value: 15000, suffix: "+", description: "Verified farmers across India" },
    { icon: ShoppingBag, label: "Orders Completed", value: 250000, suffix: "+", description: "Successful transactions" },
    { icon: Truck, label: "Daily Deliveries", value: 5000, suffix: "+", description: "Fresh produce delivered daily" },
    { icon: Award, label: "Customer Satisfaction", value: 98, suffix: "%", description: "Happy customers rating" },
  ]

  const achievements = [
    { icon: TrendingUp, text: "40% farmer income increase" },
    { icon: Globe, text: "500+ cities covered" },
    { icon: Leaf, text: "100% organic certified" },
    { icon: Clock, text: "24-hour delivery guarantee" },
  ]

  const navigate = useNavigate()
  const gotologin = () => navigate('/login')

  // Animate counters
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    stats.forEach((stat, index) => {
      let currentValue = 0
      const increment = stat.value / steps
      const timer = setInterval(() => {
        currentValue += increment
        if (currentValue >= stat.value) {
          currentValue = stat.value
          clearInterval(timer)
        }
        setCounters(prev => ({
          ...prev,
          [Object.keys(prev)[index]]: Math.floor(currentValue),
        }))
      }, stepDuration)
    })
  }, [])

  return (
    <section className="relative bg-[#111827] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1F2937] text-[#FFFFFF] border border-[#374151] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            📈 Our Impact
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6">Numbers That Speak</h2>
          <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto leading-relaxed">
            Real metrics showcasing our commitment to revolutionizing agriculture and connecting communities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="relative bg-[#1F2937] border border-[#374151] rounded-2xl p-8">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#22C55E] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <stat.icon className="w-8 h-8 text-[#FFFFFF]" />
              </div>

              {/* Counter */}
              <div className="text-4xl lg:text-5xl font-bold text-[#22C55E] mb-4">
                {Object.values(counters)[index].toLocaleString()}{stat.suffix}
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">{stat.label}</h3>

              {/* Description */}
              <p className="text-[#D1D5DB] text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-3xl p-8 lg:p-12 mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#FFFFFF] mb-8">Key Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-[#374151]">
                <div className="w-12 h-12 bg-[#22C55E] rounded-xl flex items-center justify-center">
                  <achievement.icon className="w-6 h-6 text-[#FFFFFF]" />
                </div>
                <p className="text-[#FFFFFF] font-medium">{achievement.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            className="bg-[#22C55E] text-[#FFFFFF] px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            onClick={gotologin}
          >
            <TrendingUp className="w-5 h-5" />
            Join Our Growing Community
          </button>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
