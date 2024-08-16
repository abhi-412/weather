// src/app/city/[name]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWeather } from '../../../utils/weatherService';
import { Weather } from '../../../types/weather';
import { useSearchParams } from 'next/navigation';
import { useUnit } from '../../../context/UnitContext';
import WeatherCharts from '@/components/WeatherCharts';
import "../../../styles/globals.css"
import { PiSunFill, PiSunHorizonFill } from 'react-icons/pi';
import { IoFlagOutline } from 'react-icons/io5';
import { CiTempHigh } from 'react-icons/ci';


const CityDetailsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const { unit, toggleUnit } = useUnit();
    

  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        
        if (lat && lon) {
          const data = await fetchWeather( lat, lon,unit);
          setWeather(data);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const data = await fetchWeather(latitude.toString(), longitude.toString(),unit);
              setWeather(data);
            //   Router.push(`/city?name=Current%20Location&lat=${latitude}&lon=${longitude}`);
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
  }, [name, lat, lon, unit]);


  if (loading) return <p className="text-center text-gray-500">Loading weather...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

const iconUrl = (iconCode: string) => `http://openweathermap.org/img/wn/${iconCode}.png`;

  return (

    <div className="md:p-8 p-2 flex flex-col items-center justify-center relative">
      <button className='absolute top-5 right-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded' onClick={toggleUnit} type='button'>{unit === 'metric' ? '°C -> °F' : '°F -> °C'}</button>
      <h2 className="text-5xl font-bold mb-8 text-center">Weather in {weather?.name}</h2>
      {weather && (
        <>
         <div className="bg-white border md:w-8/12 w-full border-gray-300 text-gray-800 rounded-lg shadow-lg p-3 mb-8">
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
          <div className='w-full lg:w-9/12'>
          <WeatherCharts weather={weather} />
          </div>
        </>
      )}
    </div>
  );
};

export default CityDetailsPage;
