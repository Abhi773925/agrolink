"use client"

import { useEffect, useState } from "react"
import { User, Mail, Phone, MapPin, Wheat, Briefcase, Edit3, Link, X, Save, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"

const MyProfile = () => {
  const [userData, setUserData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    role: "",
    phone: "",
    crop: "",
    region: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    if (parsedUser?.email) {
      fetch(`https://agrolink-5ok6.onrender.com/api/users/profile?email=${parsedUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data)
          setFormData({
            role: data.role || "",
            phone: data.phone || "",
            crop: data.crop || "",
            region: data.region || "",
          })
        })
        .catch((err) => console.error("Error fetching profile:", err))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const storedUser = localStorage.getItem("user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    if (!parsedUser?.email) return alert("User email not found")

    try {
      const response = await fetch("https://agrolink-5ok6.onrender.com/api/users/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsedUser.email, ...formData }),
      })
      if (response.ok) {
        alert("Profile updated successfully")
        setShowModal(false)
        window.location.reload()
      }
    } catch (err) {
      console.error("Failed to update profile:", err)
    }
  }

  const handleAddListing = () => navigate("/listing")
  const handleAgroLink = () => alert("Redirect to Agro Link")

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#374151] border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#D1D5DB] font-medium text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-[#1F2937]/95 backdrop-blur-md border border-[#374151]/30 rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-24 relative">
            <div className="absolute -bottom-8 left-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center border-4 border-[#111827]">
                <User className="h-8 w-8 text-[#D1D5DB]" />
              </div>
            </div>
          </div>
          <div className="pt-12 pb-6 px-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-1">{userData.name}</h2>
              <p className="text-[#D1D5DB] flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#FFFFFF]" />
                {userData.role || "Agricultural Professional"}
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-[#D1D5DB] px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-green-400/30 font-bold"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Info + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1F2937]/95 backdrop-blur-md border border-[#374151]/30 rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-[#FFFFFF] mb-6 flex items-center gap-2 border-l-4 border-[#374151] pl-4">
                <User className="h-5 w-5" /> Profile Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Mail, label: "Email Address", value: userData.email },
                  { icon: Phone, label: "Phone Number", value: userData.phone || "Not provided" },
                  { icon: Wheat, label: "Primary Crops", value: userData.crop || "Not specified" },
                  { icon: MapPin, label: "Region", value: userData.region || "Not specified" },
                ].map((field, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-[#374151]/50 rounded-lg border border-[#374151]/30 backdrop-blur-sm">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <field.icon className="h-5 w-5 text-[#D1D5DB]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#FFFFFF] font-medium">{field.label}</p>
                      <p className="text-[#FFFFFF] font-semibold">{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-[#1F2937]/95 backdrop-blur-md border border-[#374151]/30 rounded-xl shadow-xl p-6 space-y-4">
              <button
                onClick={handleAddListing}
                className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-[#D1D5DB] p-4 rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-green-400/30 group font-bold"
              >
                <div className="w-10 h-10 bg-[#111827]/20 rounded-lg flex items-center justify-center group-hover:bg-[#111827]/30 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Add New Listing</p>
                  <p className="text-sm text-[#D1D5DB]/70">Post your products to marketplace</p>
                </div>
              </button>

              <button
                onClick={handleAgroLink}
                className="w-full bg-[#374151]/80 hover:bg-[#2d3748] text-[#FFFFFF] p-4 rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-green-500/20 group border border-[#374151]/30"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Link className="h-5 w-5 text-[#D1D5DB]" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Agro Network</p>
                  <p className="text-sm text-[#D1D5DB]">Connect with other farmers</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#111827]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1F2937]/95 backdrop-blur-md border border-[#374151]/30 rounded-xl shadow-xl w-full max-w-md relative">
            <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-6 rounded-t-xl flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#D1D5DB] flex items-center gap-2">
                <Edit3 className="h-5 w-5" /> Update Your Profile
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[#D1D5DB]/90 hover:text-[#D1D5DB] transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {["role", "phone", "crop", "region"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#FFFFFF] mb-2 capitalize">{field.replace("-", " ")}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    className="w-full border border-[#374151]/30 bg-[#374151]/50 text-[#FFFFFF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 placeholder-[#D1D5DB]"
                  />
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-[#D1D5DB] font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-400/30"
              >
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyProfile
