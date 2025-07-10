"use client"

import { useState, useEffect } from "react"
import { Users, ShoppingBag, Truck, Award, TrendingUp, Globe, Leaf, Clock } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"
const StatsSection = () => {
  const [counters, setCounters] = useState({
    farmers: 0,
    orders: 0,
    deliveries: 0,
    satisfaction: 0,
  })

  const stats = [
    {
      icon: Users,
      label: "Active Farmers",
      value: 15000,
      suffix: "+",
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-900/20 to-blue-800/20",
      description: "Verified farmers across India",
    },
    {
      icon: ShoppingBag,
      label: "Orders Completed",
      value: 250000,
      suffix: "+",
      color: "from-green-400 to-green-600",
      bgColor: "from-green-900/20 to-green-800/20",
      description: "Successful transactions",
    },
    {
      icon: Truck,
      label: "Daily Deliveries",
      value: 5000,
      suffix: "+",
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-900/20 to-purple-800/20",
      description: "Fresh produce delivered daily",
    },
    {
      icon: Award,
      label: "Customer Satisfaction",
      value: 98,
      suffix: "%",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "from-yellow-900/20 to-yellow-800/20",
      description: "Happy customers rating",
    },
  ]

  const achievements = [
    { icon: TrendingUp, text: "40% farmer income increase", color: "text-green-400" },
    { icon: Globe, text: "500+ cities covered", color: "text-blue-400" },
    { icon: Leaf, text: "100% organic certified", color: "text-emerald-400" },
    { icon: Clock, text: "24-hour delivery guarantee", color: "text-purple-400" },
  ]
  
  
  useEffect(() => {
    
    const animateCounters = () => {
      const duration = 2000 // 2 seconds
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

          setCounters((prev) => ({
            ...prev,
            [Object.keys(prev)[index]]: Math.floor(currentValue),
          }))
        }, stepDuration)
      })
    }

    // Trigger animation after component mounts
    const timeout = setTimeout(animateCounters, 500)
    return () => clearTimeout(timeout)
  }, [])
const navigate=useNavigate();
  const gotologin=()=>{
    navigate('/login');
  }
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stats Wave Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,300 Q200,150 400,300 Q600,450 800,300 Q1000,150 1200,300 L1200,600 L0,600 Z"
            fill="url(#statsWave1)"
            className="animate-stats-wave-1"
          />
          <path
            d="M0,350 Q150,200 300,350 Q450,500 600,350 Q750,200 900,350 Q1050,500 1200,350 L1200,600 L0,600 Z"
            fill="url(#statsWave2)"
            className="animate-stats-wave-2"
          />

          <defs>
            <linearGradient id="statsWave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.25)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.05)" />
            </linearGradient>
            <linearGradient id="statsWave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.18)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.03)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Numbers */}
        <div className="absolute inset-0">
          {["📊", "📈", "🎯", "⭐", "🚀", "💯"].map((emoji, i) => (
            <div
              key={i}
              className="absolute animate-stats-float text-2xl opacity-20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full animate-stats-glow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-gradient-radial from-yellow-400/12 to-transparent rounded-full animate-stats-glow-delayed blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            📈 Our Impact
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Numbers That Speak
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real metrics showcasing our commitment to revolutionizing agriculture and connecting communities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8 hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500 blur-xl`}
              ></div>

              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>

              {/* Counter */}
              <div className="relative mb-4">
                <div
                  className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent transform group-hover:scale-110 transition-all duration-300`}
                >
                  {Object.values(counters)[index].toLocaleString()}
                  {stat.suffix}
                </div>
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {stat.description}
              </p>

              {/* Progress Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl`}
              ></div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div
          className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 lg:p-12 animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Key Achievements
              </span>
            </h3>
            <p className="text-gray-300 text-lg">Milestones that define our journey towards agricultural excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-xl border border-gray-600/20 hover:border-yellow-400/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-yellow-400 transition-colors duration-300">
                    {achievement.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div  className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
          <button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-yellow-400/30 group relative overflow-hidden" onClick={gotologin} >
            <span className="relative z-10 flex items-center gap-2" >
              <TrendingUp className="w-5 h-5" />
              Join Our Growing Community
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes stats-wave-1 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-30px) scaleY(1.2); }
        }

        @keyframes stats-wave-2 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(40px) scaleY(0.8); }
        }

        @keyframes stats-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 0.4; }
        }

        @keyframes stats-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }

        @keyframes stats-glow-delayed {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.05); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-stats-wave-1 { animation: stats-wave-1 16s ease-in-out infinite; }
        .animate-stats-wave-2 { animation: stats-wave-2 12s ease-in-out infinite reverse; }
        .animate-stats-float { animation: stats-float 10s ease-in-out infinite; }
        .animate-stats-glow { animation: stats-glow 8s ease-in-out infinite; }
        .animate-stats-glow-delayed { animation: stats-glow-delayed 10s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  )
}

export default StatsSection
