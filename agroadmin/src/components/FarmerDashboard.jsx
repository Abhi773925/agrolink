"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Users, Crop, BarChart3, Search, Loader2, Eye, X } from "lucide-react"

export default function FarmerDashboard() {
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCropsDialog, setShowCropsDialog] = useState(false)
  const [crops, setCrops] = useState({})

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/farmer")
        setFarmers(response.data)
        const cropCounts = {}
        response.data.forEach((farmer) => {
          if (farmer.crop) {
            cropCounts[farmer.crop] = (cropCounts[farmer.crop] || 0) + 1
          }
        })
        setCrops(cropCounts)
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
      farmer.crop?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const regions = [...new Set(farmers.map((farmer) => farmer.region).filter(Boolean))]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
      <p className="text-gray-400 mb-6">Manage and monitor all registered farmers</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg mb-2">Total Farmers</h2>
          <div className="flex items-center">
            <Users className="text-yellow-400 mr-2" />
            <span className="text-2xl font-bold">{farmers.length}</span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg mb-2">Unique Crops</h2>
          <div className="flex items-center">
            <Crop className="text-yellow-400 mr-2" />
            <span className="text-2xl font-bold">{Object.keys(crops).length}</span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg mb-2">Regions</h2>
          <div className="flex items-center">
            <BarChart3 className="text-yellow-400 mr-2" />
            <span className="text-2xl font-bold">{regions.length}</span>
          </div>
        </div>
      </div>
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full bg-gray-800 text-white rounded pl-10 py-2 outline-none border border-gray-700"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 text-black hover:bg-yellow-600 h-10 px-4 py-2"
          onClick={() => setShowCropsDialog(true)}
        >
          View All Crops
        </button>
      </div>

      {showCropsDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
            {/* Dialog Header */}
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">All Crops</h2>
              <p className="text-sm text-gray-400">Overview of all crops listed by farmers and their counts.</p>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                onClick={() => setShowCropsDialog(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Dialog Content */}
            <div className="grid gap-4 py-4">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Crop</th>
                    <th className="py-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(crops).map(([crop, count]) => (
                    <tr key={crop}>
                      <td className="py-1">{crop}</td>
                      <td className="py-1">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dialog Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={() => setShowCropsDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="animate-spin text-yellow-400 mr-2" />
          <span>Loading farmers...</span>
        </div>
      ) : error ? (
        <div className="bg-red-600 p-4 rounded">{error}</div>
      ) : filteredFarmers.length === 0 ? (
        <div className="bg-gray-700 p-4 rounded">No farmers found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-gray-800 rounded">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Crop</th>
                <th className="p-2">Region</th>
                <th className="p-2">Crops Listed</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map((farmer) => (
                <tr key={farmer._id} className="border-t border-gray-700">
                  <td className="p-2">{farmer.name}</td>
                  <td className="p-2">{farmer.email}</td>
                  <td className="p-2">{farmer.role}</td>
                  <td className="p-2">{farmer.phone}</td>
                  <td className="p-2">{farmer.crop || "N/A"}</td>
                  <td className="p-2">{farmer.region || "N/A"}</td>
                  <td className="p-2">
                    {farmer.crop ? (
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 py-2 text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        {farmer.email}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 py-2 text-gray-500"
                      >
                        No Crop
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
