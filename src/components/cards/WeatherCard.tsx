import { useState } from "react";
import type { WeatherType } from "../../types/types";

const Weather_API_KEY = "96e979be0c20c3aa402ffd9d837d64bb";

async function fetchWeatherData(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Weather_API_KEY}&units=metric`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await res.json();

  const weatherData: WeatherType = {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    iconLink: data.weather[0].icon,
  };

  console.log(weatherData);
  return weatherData;
}

function WeatherCard() {
  const [city, setCity] = useState<string>("cairo");
  const [weatherData, setWeatherData] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function searchHandler() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Weather Card
      </h2>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter a city..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={searchHandler}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error ? <div className="text-red-500 mb-4">{error}</div> : null}
      
      {weatherData && (
        <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-5">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.iconLink}@2x.png`}
            alt="weather icon"
            className="w-20 h-20 mb-3"
          />
          <p className="text-2xl font-semibold text-gray-800 mb-1">
            {weatherData.city}
          </p>
          <p className="capitalize text-gray-500 mb-3">
            {weatherData.description}
          </p>
          <div className="flex w-full items-center justify-between">
            <p className="text-lg text-gray-700">
              <span className="text-sm text-gray-500">Temperature:</span>{" "}
              {weatherData.temperature} °C
            </p>
            <p className="text-lg text-gray-700">
              <span className="text-sm text-gray-500">Humidity:</span>{" "}
              {weatherData.humidity}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
