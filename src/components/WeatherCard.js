import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherCard.css';

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'ee717e06d63b82962d3b93febae6bb43';

  useEffect(() => {
    fetchWeatherByGeolocation();
  }, []);

  const fetchCoordinates = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      const { lat, lon } = response.data.coord;
      return { lat, lon };
    } catch (err) {
      setError('City not found');
      return null;
    }
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    const coords = await fetchCoordinates(city);
    if (coords) {
      const { lat, lon } = coords;

      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        setWeather(weatherResponse.data);
        setForecast(forecastResponse.data.list);
        setError('');
      } catch (err) {
        setError('Unable to fetch weather data');
        setWeather(null);
        setForecast([]);
      }
    }
    setLoading(false);
  };

  const fetchWeatherByGeolocation = async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );

        setWeather(weatherResponse.data);
        setForecast(forecastResponse.data.list);
        setError('');
      } catch (err) {
        setError('Unable to fetch weather data');
        setWeather(null);
        setForecast([]);
      }
      setLoading(false);
    }, () => {
      setError('Geolocation permission denied');
      setLoading(false);
    });
  };

  const handleInputChange = async (e) => {
    const userInput = e.target.value;
    setCity(userInput);

    if (userInput.length > 2) { // Fetch suggestions when user has typed at least 3 characters
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${API_KEY}`
        );
        setSuggestions(response.data);
      } catch (err) {
        console.error('Error fetching city suggestions:', err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity.name);
    setSuggestions([]);
  };

  const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  const renderWeatherInfo = () => {
    return (
      <div className="weather-info">
        <h2>{weather ? weather.name : 'City Name'}</h2>
        <img
          src={weather ? getWeatherIcon(weather.weather[0].icon) : ''}
          alt="weather icon"
          className="weather-icon"
        />
        <div className="weather-details-grid">
          <div className="detail-item">
            <p className="detail-label">Temperature</p>
            <p className="detail-value">{weather ? `${Math.round(weather.main.temp)}°C` : '--°C'}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Description</p>
            <p className="detail-value">{weather ? weather.weather[0].description : '--'}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather ? `${weather.wind.speed} m/s` : '--'}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather ? `${weather.main.humidity}%` : '--%'}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather ? `${weather.main.pressure} hPa` : '-- hPa'}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Visibility</p>
            <p className="detail-value">{weather ? `${weather.visibility / 1000} km` : '-- km'}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{weather ? `${weather.main.feels_like}°C` : '--°C'}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Rain</p>
            <p className="detail-value">{weather ? `${weather.rain ? weather.rain['1h'] : 0} mm` : '0 mm'}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderForecast = () => {
    return (
      <div className="forecast-container">
        <h2>5-Day Forecast</h2>
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt * 1000).toLocaleString()}</p>
            <img src={getWeatherIcon(item.weather[0].icon)} alt="weather icon" />
            <p>{`${Math.round(item.main.temp)}°C`}</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderSuggestionsList = () => {
    return (
      <ul className="suggestions-list">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {`${suggestion.name}, ${suggestion.state ? suggestion.state + ', ' : ''}${suggestion.country}`}
            </li>
          ))
        ) : null}
      </ul>
    );
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        {renderSuggestionsList()}
        <button type="submit" className="btn btn-primary">Get Weather</button>
        <button type="button" className="btn btn-secondary" onClick={fetchWeatherByGeolocation}>
          {loading ? <div className="spinner"></div> : 'Use Current Location'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <hr />
      <h2>Current Weather</h2>
      <div className="weather-card">
        {loading ? <div className="spinner"></div> : renderWeatherInfo()}
      </div>
      <hr />
      {forecast.length > 0 && renderForecast()}
    </div>
  );
};

export default WeatherCard;
