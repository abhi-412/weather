/* eslint-disable @next/next/no-img-element */
// src/app/weather/[name]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchWeather, fetchHourlyForecast } from '../../../utils/weatherService';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useUnit } from '../../../context/UnitContext';
import "../../../styles/globals.css"
import { PiSunFill, PiSunHorizonFill } from "react-icons/pi";
import { CiTempHigh } from "react-icons/ci";
import { IoFlagOutline } from "react-icons/io5";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const { unit, toggleUnit } = useUnit();

  const [weather, setWeather] = useState<any | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        if (lat && lon) {
          const weatherData = await fetchWeather(lat, lon, unit);
          setWeather(weatherData);

          const forecastData = await fetchHourlyForecast(lat, lon, unit);
          setHourlyForecast(forecastData);
        } else if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const weatherData = await fetchWeather(latitude.toString(), longitude.toString(), unit);
            setWeather(weatherData);

            const forecastData = await fetchHourlyForecast(latitude.toString(), longitude.toString(), unit);
            setHourlyForecast(forecastData);
          });
        } else {
          setError('Geolocation is not supported by this browser.');
        }
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [lat, lon, unit]);

  // Helper function to format data for Chart.js
  const formatChartData = (data: any[], label: string) => ({
    labels: data.map(item => {
      const date = new Date(item.dt * 1000);
      let hours = date.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedHours = `${hours} ${ampm}`;
      return formattedHours;
    }),
    datasets: [
      {
        label: label,
        data: data.map(item => item.main.temp), // Use temperature for the chart
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });


  const iconUrl = (iconCode: string) => `http://openweathermap.org/img/wn/${iconCode}.png`;
  

  return (
    <div className="md:p-12 p-2  flex flex-col justify-center items-center relative">
      {loading && <p className="text-center text-2xl text-gray-500">Loading weather...</p>}
      {weather && (
        <>
      <button className='absolute top-5 right-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded' onClick={toggleUnit} type='button'>{unit === 'metric' ? '°C -> °F' : '°F -> °C'}</button>

          <h1 className="md:text-5xl text-3xl text-center font-bold mb-8">Weather Details</h1>
          <div className="bg-white border w-8/12 border-gray-300 text-gray-800 rounded-lg shadow-lg p-3 mb-8">
            <div className='bg-gradient-to-b  py-3 px-3 border-b-2 border-b-black'>
            <h2 className="text-2xl font-bold text-gray-800">Weather in {weather?.name}</h2>
            </div>
            <div className='flex md:gap-8 gap-2 md:flex-row flex-col'>
                <div className='flex flex-col my-2 items-center justify-center gap-1'>
                   <div className='flex items-center flex-wrap justify-center'>
                      <img
                        src={iconUrl(weather.weather[0].icon)}
                        alt={"weather icon"}
                        className="w-16 h-16 mr-2"
                      />
                      <p className="text-3xl mb-0 font-bold">{weather.main.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
                   </div>
                   <p className='text-lg font-semibold'>{weather.weather[0].main}</p>
                   <p>Humidity: {weather.main.humidity}%</p>
                </div>
                <div className='flex gap-4 md:ml-8 text-base justify-normal md:justify-between md:w-3/5 w-full flex-wrap  items-center font-semibold'>
                  <div className='flex flex-col items-center justify-center gap-3'>
                    <p className="text-3xl flex gap-0.5 items-center"><CiTempHigh /> <span className='text-sm'>Max</span></p>
                    <p className="">{weather.main.temp_max.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-3'>
                  <p className="text-3xl flex gap-0.5 items-center"><CiTempHigh /> <span className='text-sm'>Min</span></p>
                    <p className="">{weather.main.temp_min.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
                  </div>

                  <div className='flex flex-col items-center justify-center gap-3'>
                    <p className="text-3xl"><IoFlagOutline /></p>
                    <p className="">{weather.wind.speed} m/s</p>
                  </div>

                  <div className='flex flex-col items-center justify-center gap-3'>
                    <p className="text-3xl"><PiSunFill /></p>
                    <p className="">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                  </div>

                  <div className='flex flex-col items-center justify-center gap-3'>
                    <p className="text-3xl"><PiSunHorizonFill /></p>
                    <p className="">{new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                  </div>
                  

                </div>
            </div>
            {/* <button
              onClick={toggleUnit}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
            </button> */}
          </div>
          <div className="mb-8 md:w-8/12 -full">
            <h3 className="text-4xl text-center font-semibold mb-4 text-gray-700">Hourly Forecast (Every 3 Hours)</h3>
            <div className=" bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-full min-h-48 ">
              <Line
                data={formatChartData(hourlyForecast, 'Temperature')}
                // width={300}
                // height={100}
              />
            </div>
          </div>
          {/* <div id="openweathermap-widget-11" className="my-8 bg-white border border-gray-300 rounded-lg shadow-lg p-4"></div> */}
        </>
      )}
    </div>
  );
};

export default WeatherDetailsPage;
