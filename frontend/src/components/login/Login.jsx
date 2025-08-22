"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Zap } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("https://agrolink-5ok6.onrender.com/api/users/login", formData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("email", formData.email)
      navigate("/")
    } catch (error) {
      alert("Login failed. Please check your credentials.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-[#1F2937] rounded-2xl border border-[#374151] shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FACC15]/20 text-[#FFFFFF] px-4 py-2 rounded-full border border-[#FACC15]/30 text-sm font-bold mb-4">
            <Zap className="w-4 h-4" /> Secure Login
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-2">
            Welcome Back
          </h2>
          <p className="text-[#D1D5DB] text-lg">Log in to continue your agricultural journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex items-center border border-[#374151] rounded-xl px-4 py-3 bg-[#1F2937] focus-within:border-[#FACC15] transition-all">
            <Mail className="text-[#FFFFFF] mr-3" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full bg-transparent text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-[#374151] rounded-xl px-4 py-3 bg-[#1F2937] focus-within:border-[#FACC15] transition-all">
            <Lock className="text-[#FFFFFF] mr-3" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full bg-transparent text-[#FFFFFF] placeholder-[#D1D5DB] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#D1D5DB] hover:text-[#FFFFFF] ml-2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
<button
  type="submit"
  disabled={isLoading}
  className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-[#111827] font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  {isLoading ? "Logging in..." : <>
    Login
    <ArrowRight size={20} />
  </>}
</button>

        </form>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-[#D1D5DB]">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#FACC15] font-bold hover:underline"
            >
              Create Account
            </a>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[#D1D5DB] text-sm">
          <Shield className="w-4 h-4 text-[#22C55E]" />
          <span>Secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  )
}

export default Login
