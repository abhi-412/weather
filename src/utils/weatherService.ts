// src/utils/weatherService.ts

const API_KEY = '3e9ad9e52b209f83457bf030892e4a2d';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchWeather(lat: string, lon: string, unit: 'metric' | 'imperial') {
  const response = await fetch(`${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return data;
}

export async function fetchHourlyForecast(lat: string, lon: string, unit: 'metric' | 'imperial') {
  const response = await fetch(`${FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch hourly forecast data');
  }
  const data = await response.json();
  return data.list;
}
