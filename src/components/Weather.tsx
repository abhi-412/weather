// src/components/WeatherTest.tsx

'use client';

import React, { useState } from 'react';
import { fetchWeather } from '../utils/weatherService';
import { Weather } from '../types/weather';

const WeatherTest: React.FC = () => {
  const [city, setCity] = useState<string>('London');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchWeather = async () => {
    setLoading(true);
    const lat = '51.5073219';
    const lon = '-0.1276474';
    try {
      const data = await fetchWeather(lat,lon);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Weather Data</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleFetchWeather}>Get Weather</button>
      {loading && <p>Loading weather...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h3>{city}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
};

export default WeatherTest;
