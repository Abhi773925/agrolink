"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Mail, Lock, Eye, EyeOff, Sparkles, Leaf, Wheat, Sun, Droplets, ArrowRight, Shield, Zap } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("email", formData.email)

      // Success animation
      const successMsg = document.createElement("div")
      successMsg.className =
        "fixed top-4 right-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-400/30 z-50 flex items-center gap-2 backdrop-blur-sm border border-green-400/20 font-bold animate-slide-in"
      successMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        Login successful! Welcome back!
      `
      document.body.appendChild(successMsg)
      setTimeout(() => document.body.removeChild(successMsg), 3000)

      setTimeout(() => navigate("/"), 1000)
    } catch (error) {
      const errorMsg = document.createElement("div")
      errorMsg.className =
        "fixed top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-red-500/30 z-50 flex items-center gap-2 backdrop-blur-sm border border-red-500/20 font-bold animate-slide-in"
      errorMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
        Login failed. Please check your credentials.
      `
      document.body.appendChild(errorMsg)
      setTimeout(() => document.body.removeChild(errorMsg), 4000)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Ultra Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Advanced Wave System */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Primary Login Wave */}
          <path
            d="M0,400 Q150,200 300,400 Q450,600 600,400 Q750,200 900,400 Q1050,600 1200,400 L1200,800 L0,800 Z"
            fill="url(#loginWave1)"
            className="animate-login-wave-1"
          />

          {/* Secondary Wave */}
          <path
            d="M0,450 Q100,250 200,450 Q300,650 400,450 Q500,250 600,450 Q700,650 800,450 Q900,250 1000,450 Q1100,650 1200,450 L1200,800 L0,800 Z"
            fill="url(#loginWave2)"
            className="animate-login-wave-2"
          />

          {/* Tertiary Wave */}
          <path
            d="M0,500 Q75,350 150,500 Q225,650 300,500 Q375,350 450,500 Q525,650 600,500 Q675,350 750,500 Q825,650 900,500 Q975,350 1050,500 Q1125,650 1200,500 L1200,800 L0,800 Z"
            fill="url(#loginWave3)"
            className="animate-login-wave-3"
          />

          <defs>
            <linearGradient id="loginWave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.3)" />
              <stop offset="50%" stopColor="rgba(250, 204, 21, 0.15)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0.05)" />
            </linearGradient>
            <linearGradient id="loginWave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.25)" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.12)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.03)" />
            </linearGradient>
            <linearGradient id="loginWave3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Agricultural Elements */}
        <div className="absolute inset-0">
          {[Leaf, Wheat, Sun, Droplets, Sparkles, Shield].map((Icon, i) => (
            <div
              key={`agri-${i}`}
              className="absolute animate-agri-float opacity-15"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${10 + Math.random() * 5}s`,
              }}
            >
              <Icon className="w-12 h-12 text-yellow-400" />
            </div>
          ))}
        </div>

        {/* Dynamic Particle System */}
        <div className="absolute inset-0">
          {/* Large Particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-login-particles opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}

          {/* Small Sparkles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-login-sparkle opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive Mouse Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-yellow-400/15 via-yellow-400/8 to-transparent rounded-full pointer-events-none transition-all duration-500 blur-3xl"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />

        {/* Mega Gradient Orbs */}
        <div className="absolute top-1/4 left-1/6 w-[400px] h-[400px] bg-gradient-radial from-yellow-400/12 via-yellow-400/6 to-transparent rounded-full animate-login-pulse blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-[350px] h-[350px] bg-gradient-radial from-green-400/10 via-green-400/5 to-transparent rounded-full animate-login-pulse-delayed blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-blue-400/8 via-blue-400/4 to-transparent rounded-full animate-login-pulse-slow blur-3xl"></div>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 grid md:grid-cols-2 w-full max-w-6xl bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/80 rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/20 backdrop-blur-2xl animate-container-entrance">
        {/* Left side: Enhanced Image Section */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-yellow-400/10 via-transparent to-green-400/10 p-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-yellow-400 rounded-full animate-float-1"></div>
            <div className="absolute top-16 right-8 w-6 h-6 border-2 border-green-400 rounded-full animate-float-2"></div>
            <div className="absolute bottom-12 left-8 w-4 h-4 border-2 border-blue-400 rounded-full animate-float-3"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-yellow-400 rounded-full animate-float-4"></div>
          </div>

          {/* Main Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <img
              src="https://i.pinimg.com/1200x/77/bc/4b/77bc4b6f2c255d037357ddca2b0d9f2d.jpg"
              alt="Login Illustration"
              className="relative w-72 h-72 rounded-full object-cover border-4 border-yellow-400/60 shadow-2xl shadow-yellow-400/30 transition-all duration-500 group-hover:scale-105 group-hover:border-yellow-400/80 group-hover:shadow-yellow-400/50"
            />

            {/* Floating Icons around Image */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-orbit-1">
              <Leaf className="w-4 h-4 text-black" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-orbit-2">
              <Wheat className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-orbit-3">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center animate-orbit-4">
              <Sun className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2 animate-text-glow">
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                Welcome to AgroLink
              </span>
            </h3>
            <p className="text-gray-300 text-sm">Connecting farmers with the future</p>
          </div>
        </div>

        {/* Right side: Enhanced Form Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center text-white relative">
          {/* Form Header */}
          <div className="text-center mb-10 animate-slide-up">
            <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              <Zap className="inline w-4 h-4 mr-2" />
              Secure Login
            </div>
            <h2 className="text-4xl font-black text-white mb-3">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-medium">Log in to continue your agricultural journey</p>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-8 animate-form-entrance">
            {/* Email Field */}
            <div className="group relative">
              <div className="flex items-center border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl px-6 py-4 focus-within:ring-2 focus-within:ring-yellow-400/50 focus-within:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/60">
                <Mail
                  className="text-yellow-400 mr-4 group-focus-within:scale-110 transition-transform duration-300"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Password Field */}
            <div className="group relative">
              <div className="flex items-center border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl px-6 py-4 focus-within:ring-2 focus-within:ring-yellow-400/50 focus-within:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/60">
                <Lock
                  className="text-yellow-400 mr-4 group-focus-within:scale-110 transition-transform duration-300"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 ml-2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-black py-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-yellow-400/40 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login to AgroLink
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* Enhanced Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-lg font-medium">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-yellow-400 hover:text-yellow-300 font-bold hover:underline transition-all duration-300 hover:scale-105 inline-block"
                >
                  Create Account
                </a>
              </p>
            </div>
          </form>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm animate-fade-in-delayed">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes login-wave-1 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          33% { transform: translateX(-25px) translateY(-12px) scaleY(1.1); }
          66% { transform: translateX(15px) translateY(8px) scaleY(0.9); }
        }

        @keyframes login-wave-2 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          50% { transform: translateX(30px) translateY(15px) scaleY(1.2); }
        }

        @keyframes login-wave-3 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          25% { transform: translateX(-15px) translateY(-8px) scaleY(0.8); }
          75% { transform: translateX(20px) translateY(10px) scaleY(1.1); }
        }

        @keyframes agri-float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.15; }
          25% { transform: translateY(-30px) translateX(15px) rotate(90deg); opacity: 0.4; }
          50% { transform: translateY(-60px) translateX(-10px) rotate(180deg); opacity: 0.6; }
          75% { transform: translateY(-30px) translateX(-25px) rotate(270deg); opacity: 0.3; }
        }

        @keyframes login-particles {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-40px) translateX(20px) scale(1.5); opacity: 0.8; }
        }

        @keyframes login-sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }

        @keyframes login-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }

        @keyframes login-pulse-delayed {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }

        @keyframes login-pulse-slow {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.03); }
        }

        @keyframes container-entrance {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes form-entrance {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }

        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }

        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-180deg); }
        }

        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }

        @keyframes orbit-2 {
          0% { transform: rotate(90deg) translateX(150px) rotate(-90deg); }
          100% { transform: rotate(450deg) translateX(150px) rotate(-450deg); }
        }

        @keyframes orbit-3 {
          0% { transform: rotate(180deg) translateX(150px) rotate(-180deg); }
          100% { transform: rotate(540deg) translateX(150px) rotate(-540deg); }
        }

        @keyframes orbit-4 {
          0% { transform: rotate(270deg) translateX(150px) rotate(-270deg); }
          100% { transform: rotate(630deg) translateX(150px) rotate(-630deg); }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(250, 204, 21, 0.5); }
          50% { text-shadow: 0 0 20px rgba(250, 204, 21, 0.8); }
        }

        @keyframes fade-in-delayed {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-login-wave-1 { animation: login-wave-1 12s ease-in-out infinite; }
        .animate-login-wave-2 { animation: login-wave-2 8s ease-in-out infinite reverse; }
        .animate-login-wave-3 { animation: login-wave-3 6s ease-in-out infinite; }
        .animate-agri-float { animation: agri-float 10s ease-in-out infinite; }
        .animate-login-particles { animation: login-particles 8s ease-in-out infinite; }
        .animate-login-sparkle { animation: login-sparkle 4s ease-in-out infinite; }
        .animate-login-pulse { animation: login-pulse 8s ease-in-out infinite; }
        .animate-login-pulse-delayed { animation: login-pulse-delayed 10s ease-in-out infinite; }
        .animate-login-pulse-slow { animation: login-pulse-slow 12s ease-in-out infinite; }
        .animate-container-entrance { animation: container-entrance 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.2s both; }
        .animate-form-entrance { animation: form-entrance 0.8s ease-out 0.4s both; }
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 7s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 5s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 8s ease-in-out infinite; }
        .animate-orbit-1 { animation: orbit-1 20s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 25s linear infinite; }
        .animate-orbit-3 { animation: orbit-3 30s linear infinite; }
        .animate-orbit-4 { animation: orbit-4 22s linear infinite; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
        .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.6s both; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
      `}</style>
    </div>
  )
}

export default Login
