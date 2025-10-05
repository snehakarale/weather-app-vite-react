import  { useEffect, useRef, useState } from 'react';
import './Weather.css';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import conditionicon from '../assets/meteorology.png';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface WeatherData {
  humidity: number;
  condition: string;
  location: string;
  icon: string;
  temperature: number;
  windSpeed: number;
}

const Weather = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (city: string) => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('City not found');
      }

      const data = await res.json();
      setWeatherData({
        temperature: data.main.temp,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        condition: data.weather[0].main,
        location: data.name,
        icon: data.weather[0].icon
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch default city on mount
    search('London');
  }, []);

  return (
    <div className="weather dark-theme">
      <h1 className="weather-title">Weather App</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name ..."
          className="search-input"
          ref={inputRef}
        />
        <button
          className="search-button"
          onClick={() => search(inputRef.current?.value || '')}
        >
          Search
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt={weatherData.condition}
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-row">
            <div className="weather-column">
              <img
                src={conditionicon}
                alt="Condition Icon"
                className="icon"
                data-tooltip-id="conditionTip"
                data-tooltip-content="Condition"
              />
              <Tooltip id="conditionTip" />
              <p className="condition">{weatherData.condition}</p>
            </div>
            <div className="weather-column">
              <img
                src={humidityIcon}
                alt="Humidity Icon"
                className="icon"
                data-tooltip-id="humidityTip"
                data-tooltip-content="Humidity"
              />
              <Tooltip id="humidityTip" />
              <p className="humidity">{weatherData.humidity} %</p>
            </div>
            <div className="weather-column">
              <img
                src={windIcon}
                alt="Wind Icon"
                className="icon"
                data-tooltip-id="windTip"
                data-tooltip-content="Wind Speed"
              />
              <Tooltip id="windTip" />
              <p className="wind-speed">{weatherData.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
