'use client';

import { WeatherData, weatherCodeToDescription } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
  location: string;
}

export const WeatherCard = ({ data, location }: WeatherCardProps) => {
  const currentTemp = Math.round(data.current.temperature_2m);
  const weatherInfo = weatherCodeToDescription[data.current.weather_code];
  const todayIndex = data.daily.time.length - 1; // Get the last index for today

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{location}</h2>
          <p className="text-gray-600 text-sm">
            {new Date(data.current.time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="text-5xl font-semibold text-gray-800">{currentTemp}°C</div>
      </div>

      <div className="flex flex-col items-center justify-center mb-12">
        <span className="text-6xl mb-4">{weatherInfo.icon}</span>
        <p className="text-gray-700 text-xl">{weatherInfo.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <p className="text-gray-600 mb-2">High</p>
          <p className="text-2xl font-semibold text-gray-800">{Math.round(data.daily.temperature_2m_max[todayIndex])}°C</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Low</p>
          <p className="text-2xl font-semibold text-gray-800">{Math.round(data.daily.temperature_2m_min[todayIndex])}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Sunrise</p>
          <p className="text-lg text-gray-800">
            {new Date(data.daily.sunrise[todayIndex]).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Sunset</p>
          <p className="text-lg text-gray-800">
            {new Date(data.daily.sunset[todayIndex]).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
