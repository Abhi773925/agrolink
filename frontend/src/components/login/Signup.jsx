"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Sparkles,
  ArrowRight,
  Shield,
  Users,
  Briefcase,
  ShoppingCart,
  Wheat,
} from "lucide-react"
import logo from "../../assets/agro.png";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Password strength checker
  useEffect(() => {
    const checkPasswordStrength = (password) => {
      let strength = 0
      if (password.length >= 8) strength++
      if (/[A-Z]/.test(password)) strength++
      if (/[a-z]/.test(password)) strength++
      if (/[0-9]/.test(password)) strength++
      if (/[^A-Za-z0-9]/.test(password)) strength++
      return strength
    }
    setPasswordStrength(checkPasswordStrength(formData.password))
  }, [formData.password])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("https://agrolink-5ok6.onrender.com/api/users/createuser", formData)

      // Success notification
      const successMsg = document.createElement("div")
      successMsg.className =
        "fixed top-4 right-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 backdrop-blur-sm border border-green-400/20 font-bold animate-slide-in"
      successMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        ${response.data.message || "Account created successfully!"}
      `
      document.body.appendChild(successMsg)
      setTimeout(() => document.body.removeChild(successMsg), 4000)

      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "",
        phone: "",
        password: "",
      })
    } catch (error) {
      const errorMsg = document.createElement("div")
      errorMsg.className =
        "fixed top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 backdrop-blur-sm border border-red-500/20 font-bold animate-slide-in"
      errorMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
        ${error.response?.data?.message || "Signup failed. Please try again."}
      `
      document.body.appendChild(errorMsg)
      setTimeout(() => document.body.removeChild(errorMsg), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "from-red-400 to-red-600"
    if (passwordStrength <= 3) return "from-yellow-400 to-yellow-600"
    return "from-green-400 to-green-600"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
  }

  const roleIcons = {
    Farmer: Wheat,
    Seller: ShoppingCart,
    Buyer: Users,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 py-6 relative overflow-hidden">
      {/* Simple Clean Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Gradient Orbs */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-green-400/10 to-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-gradient-to-r from-yellow-400/8 to-yellow-600/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/6 to-blue-600/6 rounded-full blur-3xl"></div>

        {/* Simple Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Few Floating Elements */}
        <div className="absolute top-1/6 right-1/4 w-8 h-8 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm"></div>
        <div className="absolute bottom-1/6 left-1/4 w-6 h-6 bg-gradient-to-r from-yellow-400/25 to-yellow-600/25 rounded-full backdrop-blur-sm"></div>
        <div className="absolute top-2/3 right-1/3 w-7 h-7 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full backdrop-blur-sm"></div>
      </div>

      {/* Main Signup Container - Made Smaller */}
      <div className="relative z-10 w-full max-w-4xl bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-black/90 rounded-2xl overflow-hidden shadow-2xl border border-green-400/20 backdrop-blur-xl">
        <div className="grid md:grid-cols-5">
          {/* Left side: Compact Illustration Section */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center bg-gradient-to-tr from-green-400/10 via-transparent to-yellow-400/10 p-6 relative">
            {/* Simple Background Elements */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              <div className="absolute top-16 right-8 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              <div className="absolute bottom-12 left-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            </div>

            {/* Compact Illustration */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r  from-green-400/20 to-yellow-400/20 rounded-full blur-xl"></div>
              <img
                src="https://i.pinimg.com/1200x/77/bc/4b/77bc4b6f2c255d037357ddca2b0d9f2d.jpg"
                alt="Signup Illustration"
                className="relative w-full max-w-xs transition-transform duration-300 group-hover:scale-105 drop-shadow-lg rounded-full"
              />

              {/* Corner Icons - Smaller */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <UserCheck className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-4 h-4 text-black" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Compact Welcome Text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-lg font-bold text-white mb-1">
                <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  Join AgroLink
                </span>
              </h3>
              <p className="text-gray-300 text-sm">Connect with farmers worldwide</p>
            </div>
          </div>

          {/* Right side: Compact Form Section */}
          <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center text-white">
            {/* Compact Form Header */}
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-green-400/20 to-green-600/20 text-green-400 border border-green-400/30 px-3 py-1.5 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
                <UserCheck className="inline w-3 h-3 mr-1" />
                Create Account
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  Start Your Journey
                </span>
              </h2>
              <p className="text-gray-400 text-sm">Join our agricultural community</p>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field - Compact */}
              <div className="group">
                <label className="block text-xs font-bold text-green-400 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Full Name
                </label>
                <div className="flex items-center border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-400/50 focus-within:border-green-400/50 transition-all duration-300 backdrop-blur-sm">
                  <User className="text-green-400 mr-2.5" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Email Field - Compact */}
              <div className="group">
                <label className="block text-xs font-bold text-green-400 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  Email Address
                </label>
                <div className="flex items-center border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-400/50 focus-within:border-green-400/50 transition-all duration-300 backdrop-blur-sm">
                  <Mail className="text-green-400 mr-2.5" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Role Field - Compact */}
              <div className="group">
                <label className="block text-xs font-bold text-green-400 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Your Role
                </label>
                <div className="flex items-center border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-400/50 focus-within:border-green-400/50 transition-all duration-300 backdrop-blur-sm">
                  <Briefcase className="text-green-400 mr-2.5" size={16} />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-white focus:outline-none text-sm font-medium"
                  >
                    <option value="" className="bg-gray-800 text-gray-400">
                      -- Select Your Role --
                    </option>
                    <option value="Farmer" className="bg-gray-800 text-white">
                      🌾 Farmer
                    </option>
                    <option value="Seller" className="bg-gray-800 text-white">
                      🛒 Seller
                    </option>
                    <option value="Buyer" className="bg-gray-800 text-white">
                      👥 Buyer
                    </option>
                  </select>
                  {formData.role && roleIcons[formData.role] && (
                    <div className="ml-2">
                      {(() => {
                        const IconComponent = roleIcons[formData.role]
                        return <IconComponent className="w-4 h-4 text-yellow-400" />
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Field - Compact */}
              <div className="group">
                <label className="block text-xs font-bold text-green-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-400/50 focus-within:border-green-400/50 transition-all duration-300 backdrop-blur-sm">
                  <Phone className="text-green-400 mr-2.5" size={16} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Password Field - Compact */}
              <div className="group">
                <label className="block text-xs font-bold text-green-400 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Password
                </label>
                <div className="flex items-center border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-400/50 focus-within:border-green-400/50 transition-all duration-300 backdrop-blur-sm">
                  <Lock className="text-green-400 mr-2.5" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    required
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 ml-2"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Indicator - Compact */}
                {formData.password && (
                  <div className="mt-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${passwordStrength <= 1 ? "text-red-400" : passwordStrength <= 3 ? "text-yellow-400" : "text-green-400"}`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Compact Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-400/30 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Create My Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>

              {/* Compact Login Link */}
              <div className="text-center pt-2">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-green-400 hover:text-green-300 font-bold hover:underline transition-colors duration-300"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>

            {/* Compact Security Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Shield className="w-3 h-3 text-green-400" />
              <span>Your data is protected with enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-slide-in { 
          animation: slide-in 0.5s ease-out; 
        }
      `}</style>
    </div>
  )
}

export default Signup
