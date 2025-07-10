"use client"

import { useState, useEffect } from "react"
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Sprout,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  Loader2,
} from "lucide-react"

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState("Delhi")
  const [searchLocation, setSearchLocation] = useState("")
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationPermission, setLocationPermission] = useState(null)

  // OpenWeatherMap API key - Replace with your actual API key
  const API_KEY = "d1845658f92b31c64bd94f06f7188c9c" // Get from https://openweathermap.org/api

  const fetchWeatherData = async (city = location) => {
    setLoading(true)
    setError(null)

    try {
      // Current weather API call
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      )

      if (!currentWeatherResponse.ok) {
        throw new Error("City not found or API error")
      }

      const currentWeather = await currentWeatherResponse.json()

      // 5-day forecast API call
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
      )

      const forecast = await forecastResponse.json()

      // UV Index API call (requires lat/lon)
      const uvResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&appid=${API_KEY}`,
      )

      const uvData = await uvResponse.json()

      // Air Pollution API call for additional data
      const airPollutionResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&appid=${API_KEY}`,
      )

      const airPollution = await airPollutionResponse.json()

      // Process and set weather data
      const processedWeatherData = {
        current: {
          temperature: Math.round(currentWeather.main.temp),
          condition: currentWeather.weather[0].main,
          description: currentWeather.weather[0].description,
          humidity: currentWeather.main.humidity,
          windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
          windDirection: getWindDirection(currentWeather.wind.deg),
          pressure: currentWeather.main.pressure,
          visibility: Math.round(currentWeather.visibility / 1000), // Convert to km
          uvIndex: Math.round(uvData.value || 0),
          feelsLike: Math.round(currentWeather.main.feels_like),
          dewPoint: calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity),
          cloudCover: currentWeather.clouds.all,
          icon: currentWeather.weather[0].icon,
        },
        location: {
          name: currentWeather.name,
          country: currentWeather.sys.country,
          coordinates: {
            lat: currentWeather.coord.lat,
            lon: currentWeather.coord.lon,
          },
        },
        sun: {
          sunrise: new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sunset: new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          dayLength: calculateDayLength(currentWeather.sys.sunrise, currentWeather.sys.sunset),
        },
        soil: {
          temperature: Math.round(currentWeather.main.temp - 4), // Approximate soil temp
          moisture: calculateSoilMoisture(currentWeather.main.humidity, currentWeather.main.temp),
          ph: 6.8, // This would need a separate soil API
          nitrogen: 85, // This would need a separate soil API
        },
        airQuality: {
          aqi: airPollution.list[0]?.main.aqi || 1,
          co: airPollution.list[0]?.components.co || 0,
          no2: airPollution.list[0]?.components.no2 || 0,
          o3: airPollution.list[0]?.components.o3 || 0,
          pm2_5: airPollution.list[0]?.components.pm2_5 || 0,
        },
      }

      // Process forecast data
      const processedForecast = processForecastData(forecast.list)

      // Generate agricultural alerts
      const alerts = generateAgriculturalAlerts(processedWeatherData, processedForecast)

      setWeatherData({ ...processedWeatherData, alerts })
      setForecastData(processedForecast)
      setLocation(`${currentWeather.name}, ${currentWeather.sys.country}`)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
      console.error("Weather API Error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Helper functions
  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    return directions[Math.round(degrees / 22.5) % 16]
  }

  const calculateDewPoint = (temp, humidity) => {
    const a = 17.27
    const b = 237.7
    const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100)
    return Math.round((b * alpha) / (a - alpha))
  }

  const calculateDayLength = (sunrise, sunset) => {
    const diff = sunset - sunrise
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const calculateSoilMoisture = (humidity, temp) => {
    // Simplified calculation - in reality, this would need soil sensors
    return Math.round(humidity * 0.7 - (temp - 20) * 0.5)
  }

  const processForecastData = (forecastList) => {
    const dailyForecasts = {}

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000)
      const day = date.toDateString()

      if (!dailyForecasts[day]) {
        dailyForecasts[day] = {
          date: date,
          temps: [],
          conditions: [],
          humidity: [],
          rain: 0,
        }
      }

      dailyForecasts[day].temps.push(item.main.temp)
      dailyForecasts[day].conditions.push(item.weather[0].main)
      dailyForecasts[day].humidity.push(item.main.humidity)

      if (item.rain && item.rain["3h"]) {
        dailyForecasts[day].rain += item.rain["3h"]
      }
    })

    return Object.values(dailyForecasts)
      .slice(0, 5)
      .map((day, index) => ({
        day: index === 0 ? "Today" : day.date.toLocaleDateString([], { weekday: "short" }),
        high: Math.round(Math.max(...day.temps)),
        low: Math.round(Math.min(...day.temps)),
        condition: getMostFrequentCondition(day.conditions),
        rain: Math.round((day.rain / day.temps.length) * 100),
        humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
      }))
  }

  const getMostFrequentCondition = (conditions) => {
    return conditions
      .sort((a, b) => conditions.filter((v) => v === a).length - conditions.filter((v) => v === b).length)
      .pop()
  }

  const generateAgriculturalAlerts = (weather, forecast) => {
    const alerts = []

    // UV Alert
    if (weather.current.uvIndex > 7) {
      alerts.push({
        type: "warning",
        message: `High UV levels (${weather.current.uvIndex}) - Protect crops and avoid midday field work`,
        priority: "high",
      })
    }

    // Wind Alert
    if (weather.current.windSpeed > 25) {
      alerts.push({
        type: "warning",
        message: "Strong winds detected - Avoid spraying pesticides/fertilizers",
        priority: "medium",
      })
    }

    // Temperature Alert
    if (weather.current.temperature > 35) {
      alerts.push({
        type: "warning",
        message: "High temperature - Increase irrigation and provide shade for livestock",
        priority: "high",
      })
    }

    // Humidity Alert
    if (weather.current.humidity > 80) {
      alerts.push({
        type: "info",
        message: "High humidity - Monitor crops for fungal diseases",
        priority: "medium",
      })
    }

    // Optimal conditions
    if (
      weather.current.temperature >= 20 &&
      weather.current.temperature <= 30 &&
      weather.current.humidity >= 40 &&
      weather.current.humidity <= 70
    ) {
      alerts.push({
        type: "info",
        message: "Optimal conditions for most farming activities",
        priority: "low",
      })
    }

    // Rain forecast
    const rainDays = forecast?.filter((day) => day.rain > 50).length || 0
    if (rainDays >= 2) {
      alerts.push({
        type: "info",
        message: `Heavy rain expected in ${rainDays} days - Plan harvesting accordingly`,
        priority: "medium",
      })
    }

    return alerts
  }

  // Geolocation functions
  const getCurrentLocation = () => {
    setIsGettingLocation(true)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setIsGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          await fetchWeatherByCoordinates(latitude, longitude)
          setLocationPermission("granted")
        } catch (err) {
          setError("Failed to get weather for your location")
        } finally {
          setIsGettingLocation(false)
        }
      },
      (error) => {
        setIsGettingLocation(false)
        setLocationPermission("denied")

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied. Please enable location services.")
            break
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setError("Location request timed out.")
            break
          default:
            setError("An unknown error occurred while getting location.")
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  const fetchWeatherByCoordinates = async (lat, lon) => {
    setLoading(true)
    setError(null)

    try {
      // Current weather API call with coordinates
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      )

      if (!currentWeatherResponse.ok) {
        throw new Error("Failed to fetch weather data")
      }

      const currentWeather = await currentWeatherResponse.json()

      // 5-day forecast API call with coordinates
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      )

      const forecast = await forecastResponse.json()

      // UV Index API call
      const uvResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      )

      const uvData = await uvResponse.json()

      // Air Pollution API call
      const airPollutionResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      )

      const airPollution = await airPollutionResponse.json()

      // Process and set weather data (same as before)
      const processedWeatherData = {
        current: {
          temperature: Math.round(currentWeather.main.temp),
          condition: currentWeather.weather[0].main,
          description: currentWeather.weather[0].description,
          humidity: currentWeather.main.humidity,
          windSpeed: Math.round(currentWeather.wind.speed * 3.6),
          windDirection: getWindDirection(currentWeather.wind.deg),
          pressure: currentWeather.main.pressure,
          visibility: Math.round(currentWeather.visibility / 1000),
          uvIndex: Math.round(uvData.value || 0),
          feelsLike: Math.round(currentWeather.main.feels_like),
          dewPoint: calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity),
          cloudCover: currentWeather.clouds.all,
          icon: currentWeather.weather[0].icon,
        },
        location: {
          name: currentWeather.name,
          country: currentWeather.sys.country,
          coordinates: {
            lat: currentWeather.coord.lat,
            lon: currentWeather.coord.lon,
          },
        },
        sun: {
          sunrise: new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sunset: new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          dayLength: calculateDayLength(currentWeather.sys.sunrise, currentWeather.sys.sunset),
        },
        soil: {
          temperature: Math.round(currentWeather.main.temp - 4),
          moisture: calculateSoilMoisture(currentWeather.main.humidity, currentWeather.main.temp),
          ph: 6.8,
          nitrogen: 85,
        },
        airQuality: {
          aqi: airPollution.list[0]?.main.aqi || 1,
          co: airPollution.list[0]?.components.co || 0,
          no2: airPollution.list[0]?.components.no2 || 0,
          o3: airPollution.list[0]?.components.o3 || 0,
          pm2_5: airPollution.list[0]?.components.pm2_5 || 0,
        },
      }

      const processedForecast = processForecastData(forecast.list)
      const alerts = generateAgriculturalAlerts(processedWeatherData, processedForecast)

      setWeatherData({ ...processedWeatherData, alerts })
      setForecastData(processedForecast)
      setLocation(`${currentWeather.name}, ${currentWeather.sys.country}`)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
      console.error("Weather API Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSearch = (e) => {
    e.preventDefault()
    if (searchLocation.trim()) {
      fetchWeatherData(searchLocation.trim())
      setSearchLocation("")
    }
  }

  const getWeatherIcon = (condition, iconCode) => {
    // You can use the OpenWeather icon codes or create custom logic
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-400" />
      case "clouds":
        return <Cloud className="h-8 w-8 text-gray-300" />
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-400" />
      case "snow":
        return <CloudSnow className="h-8 w-8 text-blue-200" />
      default:
        return <Sun className="h-8 w-8 text-yellow-400" />
    }
  }

  const getUVLevel = (uvIndex) => {
    if (uvIndex <= 2) return { level: "Low", color: "text-green-400" }
    if (uvIndex <= 5) return { level: "Moderate", color: "text-yellow-400" }
    if (uvIndex <= 7) return { level: "High", color: "text-orange-400" }
    if (uvIndex <= 10) return { level: "Very High", color: "text-red-400" }
    return { level: "Extreme", color: "text-purple-400" }
  }

  const getAQILevel = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]
    const colors = ["text-green-400", "text-yellow-400", "text-orange-400", "text-red-400", "text-purple-400"]
    return { level: levels[aqi - 1] || "Unknown", color: colors[aqi - 1] || "text-gray-400" }
  }

  // Initial load with auto-location
  useEffect(() => {
    // Try to get current location first, fallback to Delhi if denied
    if (navigator.geolocation) {
      getCurrentLocation()
    } else {
      fetchWeatherData()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-yellow-400 font-medium text-lg">Loading weather data...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching real-time data from OpenWeatherMap</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Weather Data Error</h2>
          <p className="text-red-400 mb-4">{error}</p>
          <p className="text-gray-400 text-sm mb-6">Please check your API key or try a different location</p>
          <button
            onClick={() => fetchWeatherData()}
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-6 py-3 rounded-xl font-bold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">🌾 AgroWeather Dashboard</h1>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">{location}</span>
                {locationPermission === "granted" && (
                  <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">📍 Auto-located</span>
                )}
                <span className="text-gray-500">•</span>
                <span className="text-sm">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Location Search */}
              <form onSubmit={handleLocationSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Enter city name..."
                  className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white border border-gray-600/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder-gray-400 text-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>

              {/* Current Location Button */}
              <button
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                title="Get current location weather"
              >
                {isGettingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                {isGettingLocation ? "Getting..." : "My Location"}
              </button>

              <button
                onClick={() => fetchWeatherData()}
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-6 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-yellow-400/30"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        {weatherData?.alerts && weatherData.alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {weatherData.alerts.map((alert, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r backdrop-blur-xl border rounded-xl p-4 flex items-center gap-3 ${
                  alert.priority === "high"
                    ? "from-red-900/50 to-red-800/50 border-red-500/30"
                    : alert.priority === "medium"
                      ? "from-yellow-900/50 to-yellow-800/50 border-yellow-500/30"
                      : "from-blue-900/50 to-blue-800/50 border-blue-500/30"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 ${
                    alert.priority === "high"
                      ? "text-red-400"
                      : alert.priority === "medium"
                        ? "text-yellow-400"
                        : "text-blue-400"
                  }`}
                />
                <span className="text-white font-medium">{alert.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main Weather Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Current Weather - Large Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-yellow-400">Current Weather</h2>
              <div className="flex items-center gap-2">
                {getWeatherIcon(weatherData.current.condition, weatherData.current.icon)}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{weatherData.current.temperature}°C</div>
                <div className="text-gray-300 text-sm capitalize">{weatherData.current.description}</div>
                <div className="text-gray-400 text-xs mt-1">Feels like {weatherData.current.feelsLike}°C</div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-400 font-medium">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-white">{weatherData.current.humidity}%</div>
                <div className="text-xs text-gray-400 mt-1">Dew Point: {weatherData.current.dewPoint}°C</div>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium">Wind</span>
                </div>
                <div className="text-2xl font-bold text-white">{weatherData.current.windSpeed} km/h</div>
                <div className="text-xs text-gray-400 mt-1">Direction: {weatherData.current.windDirection}</div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-xl p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="h-5 w-5 text-purple-400" />
                  <span className="text-purple-400 font-medium">UV Index</span>
                </div>
                <div className="text-2xl font-bold text-white">{weatherData.current.uvIndex}</div>
                <div className={`text-xs mt-1 ${getUVLevel(weatherData.current.uvIndex).color}`}>
                  {getUVLevel(weatherData.current.uvIndex).level}
                </div>
              </div>
            </div>
          </div>

          {/* Soil Conditions */}
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Soil & Air Quality
            </h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-400 font-medium">Soil Temp</span>
                  <Thermometer className="h-4 w-4 text-orange-400" />
                </div>
                <div className="text-xl font-bold text-white">{weatherData.soil.temperature}°C</div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-medium">Soil Moisture</span>
                  <Droplets className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white">{weatherData.soil.moisture}%</div>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-medium">Air Quality</span>
                  <Activity className="h-4 w-4 text-green-400" />
                </div>
                <div className="text-xl font-bold text-white">AQI {weatherData.airQuality.aqi}</div>
                <div className={`text-xs mt-1 ${getAQILevel(weatherData.airQuality.aqi).color}`}>
                  {getAQILevel(weatherData.airQuality.aqi).level}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-400 font-medium">Cloud Cover</span>
                  <Cloud className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="text-xl font-bold text-white">{weatherData.current.cloudCover}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Weather Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Pressure</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.current.pressure}</div>
            <div className="text-xs text-gray-400">hPa</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Visibility</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.current.visibility}</div>
            <div className="text-xs text-gray-400">km</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sunrise className="h-5 w-5 text-orange-400" />
              <span className="text-orange-400 font-medium">Sunrise</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.sun.sunrise}</div>
            <div className="text-xs text-gray-400">AM</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sunset className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-medium">Sunset</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.sun.sunset}</div>
            <div className="text-xs text-gray-400">PM</div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        {forecastData && (
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              5-Day Forecast
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecastData.map((day, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="font-bold text-white mb-2">{day.day}</div>
                  <div className="flex justify-center mb-3">{getWeatherIcon(day.condition)}</div>
                  <div className="text-sm text-gray-300 mb-2">{day.condition}</div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-red-400" />
                      <span className="text-white font-bold">{day.high}°</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-blue-400" />
                      <span className="text-gray-400">{day.low}°</span>
                    </div>
                  </div>
                  <div className="text-xs text-blue-400 mb-1">
                    <Droplets className="h-3 w-3 inline mr-1" />
                    Rain: {day.rain}%
                  </div>
                  <div className="text-xs text-gray-400">Humidity: {day.humidity}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Weather
