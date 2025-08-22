"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Users, Crop, BarChart3, Search, Loader2, Eye, X } from "lucide-react"

export default function FarmerDashboard() {
  const router = useNavigate() // Initialize useRouter
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAllCropsDialog, setShowAllCropsDialog] = useState(false) // For overall crop counts
  const [showFarmerCropsDialog, setShowFarmerCropsDialog] = useState(false) // For individual farmer's crops
  const [selectedFarmer, setSelectedFarmer] = useState(null) // To store the farmer whose crops are being viewed
  const [crops, setCrops] = useState({})
  const [regions, setRegions] = useState([]) // Declare regions variable

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        // Simulating API response with added 'listedCrops' for demonstration
        const response = await axios.get("https://agrolink-5ok6.onrender.com/api/admin/farmer")
        const fetchedFarmers = response.data.map((farmer) => ({
          ...farmer,
          // Add dummy listedCrops for demonstration if not present
          listedCrops:
            farmer.listedCrops || (farmer.crop ? [farmer.crop, "Wheat", "Corn", "Soybeans", "Potatoes"] : []),
        }))

        setFarmers(fetchedFarmers)
        const cropCounts = {}
        const regionCounts = {}
        fetchedFarmers.forEach((farmer) => {
          // Count all crops, including those in listedCrops
          if (farmer.crop) {
            cropCounts[farmer.crop] = (cropCounts[farmer.crop] || 0) + 1
          }
          farmer.listedCrops?.forEach((listedCrop) => {
            cropCounts[listedCrop] = (cropCounts[listedCrop] || 0) + 1
          })

          // Count unique regions
          if (farmer.region) {
            regionCounts[farmer.region] = true
          }
        })
        setCrops(cropCounts)
        setRegions(Object.keys(regionCounts)) // Set regions array
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch farmers.")
        setLoading(false)
      }
    }
    fetchFarmers()
  }, [])

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.crop?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.listedCrops?.some((crop) => crop.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const openFarmerCropsDialog = (farmer) => {
    setSelectedFarmer(farmer)
    setShowFarmerCropsDialog(true)
  }

  const navigateToFarmerProducts = (farmerEmail) => {
    router(`/farmer-products?email=${farmerEmail}`)
  }

  return (
    <div className="min-h-screen  bg-[#111827] text-[#FFFFFF] p-6 sm:p-8 lg:p-10 font-sans">
      <h3 className="text-xl sm:text-3xl font-extrabold mb-2 text-[#FFFFFF] drop-shadow-lg animate-fade-in-down">
        Farmer Dashboard
      </h3>
      <p className="text-[#D1D5DB] mb-8 text-lg animate-fade-in-down delay-100">
        Manage and monitor all registered farmers with ease.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1F2937] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#374151] hover:border-yellow-500 animate-slide-in-up">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">Total Farmers</h2>
          <div className="flex items-center">
            <Users className="text-[#FFFFFF] mr-3 h-8 w-8" />
            <span className="text-4xl font-bold text-[#FFFFFF]">{farmers.length}</span>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#374151] hover:border-yellow-500 animate-slide-in-up delay-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">Unique Crops</h2>
          <div className="flex items-center">
            <Crop className="text-[#FFFFFF] mr-3 h-8 w-8" />
            <span className="text-4xl font-bold text-[#FFFFFF]">{Object.keys(crops).length}</span>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#374151] hover:border-yellow-500 animate-slide-in-up delay-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">Regions Covered</h2>
          <div className="flex items-center">
            <BarChart3 className="text-[#FFFFFF] mr-3 h-8 w-8" />
            <span className="text-4xl font-bold text-[#FFFFFF]">{regions.length}</span>
          </div>
        </div>
      </div>

      {/* Search and Global Actions */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6 animate-pop-in">
        <div className="relative w-full md:w-2/3 lg:w-1/2 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1D5DB] group-focus-within:text-[#FFFFFF] transition-colors duration-200" />
          <input
            type="text"
            className="w-full bg-[#1F2937] text-[#FFFFFF] rounded-full pl-12 pr-12 py-3 outline-none border border-[#374151] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 shadow-md placeholder:text-[#D1D5DB]"
            placeholder="Search farmers by name, email, region, or crop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D1D5DB] hover:text-[#FFFFFF] transition-colors duration-200 p-1 rounded-full hover:bg-[#374151]"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#22C55E] text-gray-900 hover:bg-[#22C55E] h-12 px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          onClick={() => setShowAllCropsDialog(true)}
        >
          View All Crops Overview
        </button>
      </div>

      {/* All Crops Overview Dialog */}
      {showAllCropsDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-xl border border-[#374151] bg-[#1F2937] p-8 shadow-2xl animate-dialog-show">
            {/* Dialog Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#FFFFFF]">All Crops Overview</h2>
              <button
                className="rounded-full p-2 text-[#D1D5DB] hover:bg-[#374151] hover:text-[#FFFFFF] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onClick={() => setShowAllCropsDialog(false)}
                aria-label="Close dialog"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Dialog Content */}
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <table className="w-full text-left">
                <thead>
                  <tr className="sticky top-0 bg-[#1F2937]">
                    <th className="py-3 text-[#D1D5DB] font-semibold text-lg">Crop</th>
                    <th className="py-3 text-[#D1D5DB] font-semibold text-lg">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(crops).map(([crop, count]) => (
                    <tr
                      key={crop}
                      className="border-t border-[#374151] hover:bg-[#374151] transition-colors duration-150"
                    >
                      <td className="py-2 text-[#FFFFFF]">{crop}</td>
                      <td className="py-2 text-[#FFFFFF]">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end mt-6">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-700 text-[#FFFFFF] hover:bg-gray-600 h-10 px-6 py-2 shadow-md"
                onClick={() => setShowAllCropsDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Farmer Specific Crops Dialog */}
      {showFarmerCropsDialog && selectedFarmer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-xl border border-[#374151] bg-[#1F2937] p-8 shadow-2xl animate-dialog-show">
            {/* Dialog Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#FFFFFF]">Crops by {selectedFarmer.name}</h2>
              <button
                className="rounded-full p-2 text-[#D1D5DB] hover:bg-[#374151] hover:text-[#FFFFFF] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onClick={() => setShowFarmerCropsDialog(false)}
                aria-label="Close dialog"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Dialog Content */}
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              {selectedFarmer.listedCrops && selectedFarmer.listedCrops.length > 0 ? (
                <ul className="list-disc pl-6 text-[#FFFFFF] text-lg space-y-2">
                  {selectedFarmer.listedCrops.map((crop, index) => (
                    <li key={index} className="py-1">
                      {crop}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#D1D5DB] text-lg">No additional crops listed by this farmer.</p>
              )}
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end mt-6">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-700 text-[#FFFFFF] hover:bg-gray-600 h-10 px-6 py-2 shadow-md"
                onClick={() => setShowFarmerCropsDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Farmers Table */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 bg-[#1F2937] rounded-xl shadow-lg animate-pulse-glow">
          <Loader2 className="animate-spin text-[#FFFFFF] mr-4 h-12 w-12" />
          <span className="text-xl text-[#D1D5DB] mt-4">Loading farmers data...</span>
        </div>
      ) : error ? (
        <div className="bg-red-700 p-6 rounded-xl text-[#FFFFFF] text-lg font-semibold shadow-lg animate-pop-in">
          {error}
        </div>
      ) : filteredFarmers.length === 0 ? (
        <div className="bg-gray-700 p-6 rounded-xl text-[#FFFFFF] text-lg font-semibold shadow-lg animate-pop-in">
          No farmers found matching your search criteria.
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#1F2937] rounded-xl shadow-lg border border-[#374151] animate-slide-in-up delay-300">
          <table className="min-w-full text-left">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Name</th>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Email</th>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Role</th>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Phone</th>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Primary Crop</th>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Region</th>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Crops Listed</th>
                <th className="p-4 text-gray-200 font-semibold text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map((farmer) => (
                <tr
                  key={farmer._id}
                  className="border-t border-[#374151] hover:bg-[#374151] transition-colors duration-150"
                >
                  <td className="p-4 text-[#FFFFFF]">{farmer.name}</td>
                  <td className="p-4 text-[#D1D5DB]">{farmer.email}</td>
                  <td className="p-4 text-[#D1D5DB]">{farmer.role}</td>
                  <td className="p-4 text-[#D1D5DB]">{farmer.phone}</td>
                  <td className="p-4 text-[#D1D5DB]">{farmer.crop || "N/A"}</td>
                  <td className="p-4 text-[#D1D5DB]">{farmer.region || "N/A"}</td>
                  <td className="p-4">
                    {farmer.crop ? (
                      <span className="inline-flex items-center text-[#FFFFFF] font-medium">
                        <Eye className="h-4 w-4 mr-1" />
                        {farmer.crop}
                      </span>
                    ) : (
                      <span className="text-[#D1D5DB]">No Primary Crop</span>
                    )}
                  </td>
                  <td className="p-4">
                    {farmer.listedCrops && farmer.listedCrops.length > 0 ? (
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#374151] bg-transparent text-[#FFFFFF] hover:bg-[#22C55E] hover:text-gray-900 h-9 px-4 py-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                        onClick={() => navigateToFarmerProducts(farmer.email)}
                      >
                        View Products ({farmer.listedCrops.length})
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 text-[#D1D5DB] cursor-not-allowed"
                      >
                        No Products
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
