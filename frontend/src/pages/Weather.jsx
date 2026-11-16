
import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: "Clear Sky ☀️",
      1: "Mainly Clear 🌤️",
      2: "Partly Cloudy ⛅",
      3: "Overcast ☁️",
      45: "Foggy 🌫️",
      48: "Foggy 🌫️",
      51: "Light Drizzle 🌦️",
      61: "Light Rain 🌧️",
      63: "Moderate Rain 🌧️",
      65: "Heavy Rain ⛈️",
      71: "Light Snow ❄️",
      80: "Rain Showers 🌦️",
      95: "Thunderstorm ⛈️",
    };

    return descriptions[code] || "Variable Weather";
  };

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      // Step 1: Get city coordinates
      const geoResponse = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: city.trim(),
            count: 1,
            language: "en",
            format: "json",
          },
        }
      );

      const location = geoResponse.data.results?.[0];

      if (!location) {
        setError("City not found. Please try another city.");
        return;
      }

      // Step 2: Get weather forecast
      const weatherResponse = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
            daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
            timezone: "auto",
            forecast_days: 5,
          },
        }
      );

      setWeather({
        location,
        ...weatherResponse.data,
      });

    } catch (err) {
      console.error("Weather error:", err);
      setError("Unable to fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">

      <div className="weather-header">
        <h1>🌦️ Weather Forecast</h1>
        <p>
          Check weather conditions to plan your farming activities.
        </p>
      </div>

      <form onSubmit={fetchWeather} className="weather-search">
        <input
          type="text"
          placeholder="Enter city name (e.g. Bilaspur)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </form>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {weather && (
        <div className="weather-results">

          <div className="current-weather">
            <h2>
              {weather.location.name},{" "}
              {weather.location.country}
            </h2>

            <h1>
              {weather.current.temperature_2m}°C
            </h1>

            <h3>
              {getWeatherDescription(
                weather.current.weather_code
              )}
            </h3>

            <p>
              Feels like: {weather.current.apparent_temperature}°C
            </p>
          </div>

          <div className="weather-details">

            <div className="weather-card">
              <h3>💧 Humidity</h3>
              <p>
                {weather.current.relative_humidity_2m}%
              </p>
            </div>

            <div className="weather-card">
              <h3>💨 Wind Speed</h3>
              <p>
                {weather.current.wind_speed_10m} km/h
              </p>
            </div>

            <div className="weather-card">
              <h3>🌧️ Precipitation</h3>
              <p>
                {weather.current.precipitation} mm
              </p>
            </div>

          </div>

          <h2>5-Day Forecast</h2>

          <div className="forecast-container">

            {weather.daily.time.map((date, index) => (
              <div className="forecast-card" key={date}>

                <h4>
                  {new Date(date + "T00:00:00").toLocaleDateString(
                    "en-IN",
                    { weekday: "short", day: "numeric" }
                  )}
                </h4>

                <p>
                  🌡️ {weather.daily.temperature_2m_max[index]}°C
                </p>

                <p>
                  Min: {weather.daily.temperature_2m_min[index]}°C
                </p>

                <p>
                  🌧️ {weather.daily.precipitation_probability_max[index] ?? "N/A"}%
                </p>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default Weather;
