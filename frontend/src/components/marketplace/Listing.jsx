"use client"

import { useState } from "react"
import { Package, User, Hash, DollarSign, MapPin, FileText, ImageIcon, Upload } from "lucide-react"

const Listing = () => {
  const [formData, setFormData] = useState({
    listingId: "",
    email: "",
    name: "",
    quantity: "",
    price: "",
    region: "",
    description: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("http://localhost:5000/api/users/listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      const successMsg = document.createElement("div")
      successMsg.className =
        "fixed top-4 right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-xl shadow-lg shadow-yellow-400/30 z-50 flex items-center gap-2 backdrop-blur-sm border border-yellow-400/20 font-bold"
      successMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        Listing created successfully!
      `
      document.body.appendChild(successMsg)
      setTimeout(() => document.body.removeChild(successMsg), 4000)
      setFormData({
        listingId: "",
        email: "",
        name: "",
        quantity: "",
        price: "",
        region: "",
        description: "",
        image: "",
      })
    } catch (error) {
      const errorMsg = document.createElement("div")
      errorMsg.className =
        "fixed top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-red-500/30 z-50 flex items-center gap-2 backdrop-blur-sm border border-red-500/20 font-bold"
      errorMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
        ${error.message || "Failed to create listing"}
      `
      document.body.appendChild(errorMsg)
      setTimeout(() => document.body.removeChild(errorMsg), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-md px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <Package className="h-6 w-6" />
              Create Product Listing
            </h3>
            <p className="text-black/70 text-sm font-medium">Provide details about your agricultural product</p>
          </div>

          {/* Form Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-b from-gray-900/50 via-gray-800/40 to-gray-900/50">
            {[
              {
                label: "Listing ID",
                name: "listingId",
                icon: Hash,
                type: "number",
                placeholder: "Unique ID",
              },
              {
                label: "Email Address",
                name: "email",
                icon: User,
                type: "email",
                placeholder: "example@mail.com",
              },
              {
                label: "Region",
                name: "region",
                icon: MapPin,
                type: "text",
                placeholder: "Enter region",
              },
              {
                label: "Product Name",
                name: "name",
                icon: Package,
                type: "text",
                placeholder: "e.g. Basmati Rice",
              },
              {
                label: "Quantity (kg/tons)",
                name: "quantity",
                icon: Hash,
                type: "number",
                placeholder: "Enter quantity",
              },
              {
                label: "Price per Unit (₹)",
                name: "price",
                icon: DollarSign,
                type: "number",
                placeholder: "Enter price",
                step: "0.01",
              },
              {
                label: "Image URL",
                name: "image",
                icon: ImageIcon,
                type: "url",
                placeholder: "https://example.com/image.jpg",
              },
            ].map(({ label, name, icon: Icon, ...rest }) => (
              <div key={name} className="space-y-2">
                <label className="text-sm font-medium text-yellow-400 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-yellow-400" />
                  {label}
                </label>
                <input
                  {...rest}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white border border-gray-600/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 placeholder-gray-400 font-medium"
                  required
                />
              </div>
            ))}

            {/* Description Field */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-yellow-400 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your product in detail..."
                className="w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white border border-gray-600/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 resize-none placeholder-gray-400 font-medium"
                required
              />
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div className="md:col-span-2 mt-4">
                <h5 className="text-sm text-yellow-400 mb-3 font-medium flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image Preview
                </h5>
                <div className="relative inline-block">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl border border-gray-600/30 shadow-lg"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="md:col-span-2 mt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-xl shadow-lg shadow-yellow-400/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-yellow-400/40"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Creating Listing...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Create Listing
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    listingId: "",
                    email: "",
                    name: "",
                    quantity: "",
                    price: "",
                    region: "",
                    description: "",
                    image: "",
                  })
                }
                className="sm:w-auto bg-gradient-to-r from-gray-800/90 via-gray-700/80 to-gray-800/90 hover:from-gray-700/90 hover:to-gray-600/80 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-600/30 hover:scale-[1.02] hover:shadow-lg"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing
