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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(
        "https://agrolink-5ok6.onrender.com/api/users/createuser",
        formData
      )

      const successMsg = document.createElement("div")
      successMsg.className =
        "fixed top-4 right-4 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 backdrop-blur-sm border border-[#22C55E]/20 font-bold animate-slide-in"
      successMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        ${response.data.message || "Account created successfully!"}
      `
      document.body.appendChild(successMsg)
      setTimeout(() => document.body.removeChild(successMsg), 4000)

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
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
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
    if (passwordStrength <= 1) return "from-red-500 to-red-600"
    if (passwordStrength <= 3) return "from-yellow-400 to-yellow-500"
    return "from-[#22C55E] to-[#16A34A]"
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
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4 py-6 relative overflow-hidden">
      {/* Main Signup Container */}
      <div className="relative z-10 w-full max-w-4xl bg-[#1F2937] rounded-2xl overflow-hidden shadow-2xl border border-[#374151] backdrop-blur-xl">
        <div className="grid md:grid-cols-5">
          {/* Left Illustration */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center bg-[#1F2937]/50 p-6 relative">
            <img
              src="https://i.pinimg.com/1200x/77/bc/4b/77bc4b6f2c255d037357ddca2b0d9f2d.jpg"
              alt="Signup Illustration"
              className="relative w-full max-w-xs rounded-full shadow-lg"
            />
          </div>

          {/* Right Form */}
          <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center text-[#FFFFFF]">
            <div className="text-center mb-6">
              <div className="inline-block bg-[#1F2937]/20 text-[#22C55E] border border-[#374151] px-3 py-1.5 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
                <UserCheck className="inline w-3 h-3 mr-1" />
                Create Account
              </div>
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-1">
                <span className="text-[#FACC15]">Start Your Journey</span>
              </h2>
              <p className="text-[#D1D5DB] text-sm">Join our agricultural community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="group">
                <label className="block text-xs font-bold text-[#22C55E] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Full Name
                </label>
                <div className="flex items-center border border-[#374151] bg-[#1F2937]/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#22C55E]/50 transition-all duration-300">
                  <User className="text-[#22C55E] mr-2.5" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-transparent text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-xs font-bold text-[#22C55E] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  Email Address
                </label>
                <div className="flex items-center border border-[#374151] bg-[#1F2937]/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#22C55E]/50 transition-all duration-300">
                  <Mail className="text-[#22C55E] mr-2.5" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="group">
                <label className="block text-xs font-bold text-[#22C55E] mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  Your Role
                </label>
                <div className="flex items-center border border-[#374151] bg-[#1F2937]/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#22C55E]/50 transition-all duration-300">
                  <Briefcase className="text-[#22C55E] mr-2.5" size={16} />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-[#FFFFFF] focus:outline-none text-sm font-medium"
                  >
                    <option value="" className="bg-[#1F2937] text-[#D1D5DB]">
                      -- Select Your Role --
                    </option>
                    <option value="Farmer" className="bg-[#1F2937] text-[#FFFFFF]">
                      🌾 Farmer
                    </option>
                    <option value="Seller" className="bg-[#1F2937] text-[#FFFFFF]">
                      🛒 Seller
                    </option>
                    <option value="Buyer" className="bg-[#1F2937] text-[#FFFFFF]">
                      👥 Buyer
                    </option>
                  </select>
                  {formData.role && roleIcons[formData.role] && (
                    <div className="ml-2">
                      {(() => {
                        const IconComponent = roleIcons[formData.role]
                        return <IconComponent className="w-4 h-4 text-[#FFFFFF]" />
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="group">
                <label className="block text-xs font-bold text-[#22C55E] mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  Phone Number
                </label>
                <div className="flex items-center border border-[#374151] bg-[#1F2937]/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#22C55E]/50 transition-all duration-300">
                  <Phone className="text-[#22C55E] mr-2.5" size={16} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full bg-transparent text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-xs font-bold text-[#22C55E] mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Password
                </label>
                <div className="flex items-center border border-[#374151] bg-[#1F2937]/50 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#22C55E]/50 transition-all duration-300">
                  <Lock className="text-[#22C55E] mr-2.5" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    required
                    className="w-full bg-transparent text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#D1D5DB] hover:text-[#22C55E] transition-colors duration-300 ml-2"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#374151] rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          passwordStrength <= 1
                            ? "text-red-500"
                            : passwordStrength <= 3
                            ? "text-yellow-400"
                            : "text-[#22C55E]"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#22C55E] via-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#22C55E] text-white font-bold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#22C55E]/30 disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Create My Account
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-2">
                <p className="text-[#D1D5DB] text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[#22C55E] hover:text-[#16A34A] font-bold hover:underline transition-colors duration-300"
                  >
                    Sign In
                  </a>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[#D1D5DB] text-xs">
                <Shield className="w-3 h-3 text-[#22C55E]" />
                <span>Your data is protected with enterprise-grade security</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Signup
