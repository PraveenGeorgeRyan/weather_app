'use client';

import { WeatherData, weatherCodeToDescription } from '../types/weather';

interface ForecastSectionProps {
  data: WeatherData;
}

export const ForecastSection = ({ data }: ForecastSectionProps) => {
  // Get the last 3 days of forecast (including today)
  const startIndex = data.daily.time.length - 3;
  const forecastDays = data.daily.time.slice(startIndex);
  const weatherCodes = data.daily.weather_code.slice(startIndex);
  const maxTemps = data.daily.temperature_2m_max.slice(startIndex);
  const minTemps = data.daily.temperature_2m_min.slice(startIndex);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">3-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-8">
        {forecastDays.map((day, index) => {
          const date = new Date(day);
          const weatherInfo = weatherCodeToDescription[weatherCodes[index]];
          const isToday = index === forecastDays.length - 1;
          
          return (
            <div 
              key={day}
              className="text-center"
            >
              <p className="font-medium text-gray-800 mb-1">
                {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="mb-4">
                <span className="text-4xl" role="img" aria-label={weatherInfo.text}>
                  {weatherInfo.icon}
                </span>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <span className="text-gray-800 font-medium">
                  {Math.round(maxTemps[index])}°
                </span>
                <span className="text-gray-500">
                  {Math.round(minTemps[index])}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
