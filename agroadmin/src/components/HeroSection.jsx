import { Link } from "react-router-dom"
import { Package, ShoppingCart, UsersRound, DollarSign, TrendingUp, Clock, ExternalLink, MapPin, Mail, Phone, Globe } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    cancelledOrders: 0,
    totalProducts: 0,
    activeUsers: 0,
    todayRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch stats from your admin API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/admin/stats")
        const data = await response.json()
        
        if (data.success) {
          console.log("Stats from API:", data.stats) // Debug log
          setStats(data.stats)
        } else {
          setError("Failed to fetch stats")
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
        setError("Error connecting to server")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    
    // Optional: Set up polling to refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0)
  }

  const heroStats = [
    { 
      title: "Total Orders", 
      value: loading ? "..." : stats.totalOrders?.toLocaleString() || "0", 
      icon: ShoppingCart, 
      color: "text-yellow-400",
      change: "+15% from last month"
    },
    { 
      title: "Total Revenue", 
      value: loading ? "..." : formatCurrency(stats.totalRevenue), 
      icon: DollarSign, 
      color: "text-green-400",
      change: "+10% from last week"
    },
    { 
      title: "Processing Orders", 
      value: loading ? "..." : (stats.processingOrders !== undefined ? stats.processingOrders.toLocaleString() : "N/A"), 
      icon: Package, 
      color: "text-orange-400",
      change: stats.processingOrders > 0 ? "In progress" : (stats.processingOrders === 0 ? "All processed!" : "Data not available")
    },
    { 
      title: "Delivered Orders", 
      value: loading ? "..." : stats.deliveredOrders?.toLocaleString() || "0", 
      icon: TrendingUp, 
      color: "text-blue-400",
      change: "+5% from yesterday"
    },
  ]

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <section className="relative overflow-hidden bg-black py-12 md:py-20 text-white flex-1">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite'
              }}
            ></div>
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 193, 7, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 193, 7, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                animation: 'gridMove 30s linear infinite reverse'
              }}
            ></div>
          </div>
          
          <style jsx>{`
            @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
            }
          `}</style>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Welcome to AgroLink Admin Panel
              </h1>
              <p className="text-lg text-red-400 mb-8">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-900/90 backdrop-blur-sm border-t border-gray-800/50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-bold text-white">AgroLink Admin</span>
              </div>
              <p className="text-gray-400 text-sm">
                © 2025 AgroLink. All rights reserved. Empowering farmers through technology.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <section className="relative overflow-hidden bg-black py-12 md:py-20 text-white flex-1">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>
          
          {/* Primary Grid Layer */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: 'gridMove 25s linear infinite'
            }}
          ></div>
          
          {/* Secondary Grid Layer */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 193, 7, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 193, 7, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              animation: 'gridMove 35s linear infinite reverse'
            }}
          ></div>
          
          {/* Tertiary Grid Layer */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '120px 120px',
              animation: 'gridMove 45s linear infinite'
            }}
          ></div>
          
          {/* Glowing Dots */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '3s'}}></div>
          </div>
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
        </div>

        <style jsx>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(40px, 40px); }
          }
        `}</style>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-lg">
              Welcome to AgroLink Admin Panel
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-md">
              Manage your agricultural marketplace with ease. Get real-time insights and control over your operations.
            </p>
            {loading && (
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 text-white shadow-xl shadow-black/30 transform hover:scale-105 transition-all duration-300 hover:bg-gray-900/90 hover:border-gray-700/50 ${
                  loading ? 'animate-pulse' : ''
                }`}
              >
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                  <stat.icon className={`h-5 w-5 ${stat.color} drop-shadow-md`} />
                </div>
                <div className="text-2xl font-bold">
                  {loading ? (
                    <div className="h-8 bg-gray-800 rounded w-20 animate-pulse"></div>
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {loading ? (
                    <div className="h-3 bg-gray-800 rounded w-24 animate-pulse"></div>
                  ) : (
                    stat.change
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Quick Stats */}
          {!loading && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/40 rounded-lg p-4 hover:bg-gray-900/70 transition-all duration-300">
                <div className="text-sm text-gray-400">Pending Orders</div>
                <div className="text-xl font-semibold text-yellow-400">
                  {stats.pendingOrders || 0}
                </div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/40 rounded-lg p-4 hover:bg-gray-900/70 transition-all duration-300">
                <div className="text-sm text-gray-400">Shipped Orders</div>
                <div className="text-xl font-semibold text-purple-400">
                  {stats.shippedOrders || 0}
                </div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/40 rounded-lg p-4 hover:bg-gray-900/70 transition-all duration-300">
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-xl font-semibold text-green-400">
                  {stats.totalOrders > 0 
                    ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) 
                    : 0}%
                </div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/40 rounded-lg p-4 hover:bg-gray-900/70 transition-all duration-300">
                <div className="text-sm text-gray-400">Avg. Order Value</div>
                <div className="text-xl font-semibold text-blue-400">
                  {formatCurrency(stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0)}
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/all-farmers"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:-translate-y-1 mr-4 shadow-lg hover:shadow-xl"
            >
              Browse Farmers
            </Link>
            <Link
              to="/overview"
              className="inline-flex items-center px-6 py-3 border border-yellow-400 text-base font-medium rounded-md shadow-sm text-yellow-400 bg-transparent hover:bg-yellow-400/10 transition-all duration-300 backdrop-blur-sm mr-4"
            >
              View Dashboard
            </Link>
            <a
              href="http://localhost:5173" // Change this to your client site URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-green-400 text-base font-medium rounded-md shadow-sm text-green-400 bg-transparent hover:bg-green-400/10 transition-all duration-300 backdrop-blur-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Client Site
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}