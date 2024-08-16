'use client';

import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Weather } from '../types/weather';

// Register necessary Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement // Ensure PointElement is registered
);

interface WeatherChartsProps {
  weather: Weather;
}

const WeatherCharts: React.FC<WeatherChartsProps> = ({ weather }) => {
  const temperatureData = {
    labels: ['Current', 'High', 'Low'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [weather.main.temp, weather.main.temp_max, weather.main.temp_min],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const humidityData = {
    labels: ['Humidity'],
    datasets: [
      {
        label: 'Humidity (%)',
        data: [weather.main.humidity],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const windSpeedData = {
    labels: ['Wind Speed', 'Wind Gust'],
    datasets: [
      {
        label: 'Wind (m/s)',
        data: [weather.wind.speed, weather.wind.gust],
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full justify-center flex lg:flex-row flex-col items-center gap-10">
      <div className="w-full md:w-1/2 mx-auto">
        <h2 className="text-xl font-bold mb-4">Temperature Chart</h2>
        <Line

        data={temperatureData} />
      </div>
      
      <div className="w-full md:w-1/2 mx-auto">
        <h2 className="text-xl font-bold mb-4">Humidity Chart</h2>
        <Bar

        data={humidityData} />
      </div>
      <div className="w-full md:w-1/2 mx-auto">
        <h2 className="text-xl font-bold mb-4">Wind Speed Chart</h2>
        <Pie

         data={windSpeedData} />
      </div>
    </div>
  );
};

export default WeatherCharts;
