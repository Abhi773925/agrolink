import axios from "axios";
import { Cloud, Droplets, MapPin, Search, Thermometer, Wind } from "lucide-react";
import { useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "22292c2a31ed5c6f1e1c2c88f7b4eb1f";

  const fetchWeather = async (event) => {
    event.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch {
      setError("Unable to fetch weather for this location.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <header>
          <h1 className="text-2xl font-semibold text-gray-900">Weather Insights</h1>
          <p className="mt-1 text-sm text-gray-600">Check current weather conditions for planning harvesting and logistics.</p>
        </header>

        <form onSubmit={fetchWeather} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
            Search location
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <input
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter city name"
                className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </button>
          </div>
        </form>

        {loading && <p className="text-sm text-gray-600">Loading weather data...</p>}
        {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {weatherData && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-900">{weatherData.name}</h2>
              <p className="mt-1 text-sm text-gray-600">{weatherData.weather?.[0]?.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Temperature</p>
                <p className="mt-2 flex items-center text-lg font-semibold text-gray-900">
                  <Thermometer className="mr-2 h-5 w-5 text-green-700" />
                  {weatherData.main?.temp} deg C
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Humidity</p>
                <p className="mt-2 flex items-center text-lg font-semibold text-gray-900">
                  <Droplets className="mr-2 h-5 w-5 text-green-700" />
                  {weatherData.main?.humidity}%
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Wind</p>
                <p className="mt-2 flex items-center text-lg font-semibold text-gray-900">
                  <Wind className="mr-2 h-5 w-5 text-green-700" />
                  {weatherData.wind?.speed} m/s
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Condition</p>
                <p className="mt-2 flex items-center text-lg font-semibold text-gray-900">
                  <Cloud className="mr-2 h-5 w-5 text-green-700" />
                  {weatherData.weather?.[0]?.main}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Pressure</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{weatherData.main?.pressure} hPa</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Visibility</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{(weatherData.visibility || 0) / 1000} km</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;