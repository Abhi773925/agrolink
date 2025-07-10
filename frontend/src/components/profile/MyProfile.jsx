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
      fetch(`http://localhost:5000/api/users/profile?email=${parsedUser.email}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data)
          setFormData({
            role: data.role || "",
            phone: data.phone || "",
            crop: data.crop || "",
            region: data.region || "",
          })
        })
        .catch((err) => {
          console.error("Error fetching profile:", err)
        })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const storedUser = localStorage.getItem("user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    if (!parsedUser?.email) {
      return alert("User email not found")
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsedUser.email,
          ...formData,
        }),
      })
      if (response.ok) {
        alert("Profile updated successfully")
        setShowModal(false)
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handleAddListing = () => {
    alert("Redirect to Marketplace Listing")
    navigate("/listing")
  }

  const handleAgroLink = () => {
    alert("Redirect to Agro Link")
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-400 font-medium text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-24 relative">
            <div className="absolute -bottom-8 left-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-lg flex items-center justify-center border-4 border-gray-900">
                <User className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>

          <div className="pt-12 pb-6 px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{userData.name}</h2>
                <p className="text-gray-300 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-yellow-400" />
                  {userData.role || "Agricultural Professional"}
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-yellow-400/30 font-bold"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-2xl p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
                <User className="h-5 w-5" />
                Profile Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-400 font-medium">Email Address</p>
                    <p className="text-white font-semibold">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-400 font-medium">Phone Number</p>
                    <p className="text-white font-semibold">{userData.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Wheat className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-400 font-medium">Primary Crops</p>
                    <p className="text-white font-semibold">{userData.crop || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-400 font-medium">Region</p>
                    <p className="text-white font-semibold">{userData.region || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-2xl p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-6 border-l-4 border-yellow-400 pl-4">
                Quick Actions
              </h3>

              <div className="space-y-4">
                <button
                  onClick={handleAddListing}
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black p-4 rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-yellow-400/30 group font-bold"
                >
                  <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Add New Listing</p>
                    <p className="text-sm text-black/70">Post your products to marketplace</p>
                  </div>
                </button>

                <button
                  onClick={handleAgroLink}
                  className="w-full bg-gradient-to-r from-gray-800/90 via-gray-700/80 to-gray-800/90 hover:from-gray-700/90 hover:to-gray-600/80 text-white p-4 rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl group border border-gray-600/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Link className="h-5 w-5 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Agro Network</p>
                    <p className="text-sm text-gray-300">Connect with other farmers</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-2xl w-full max-w-md relative">
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  Update Your Profile
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-black hover:text-black/70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter your role (e.g., Farmer, Supplier)"
                  className="w-full border border-gray-600/30 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-600/30 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Primary Crops</label>
                <input
                  type="text"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  placeholder="Enter your primary crops"
                  className="w-full border border-gray-600/30 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Region</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="Enter your region"
                  className="w-full border border-gray-600/30 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 placeholder-gray-400"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-400/30"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyProfile
