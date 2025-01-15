import axios from 'axios';
import { WeatherData } from '../types/weather';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export interface GeocodingResult {
  latitude: number;
  longitude: number;
}

// Geocoding API to convert city names to coordinates
export const geocodeLocation = async (query: string): Promise<GeocodingResult> => {
  if (!query) throw new Error('Search query is required');
  
  try {
    console.log('Geocoding query:', query);
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        name: query,
        count: 1,
        language: 'en',
        format: 'json'
      }
    });
    
    console.log('Geocoding response:', response.data);

    if (!response.data.results?.[0]) {
      throw new Error(`Location "${query}" not found`);
    }

    const result = {
      latitude: response.data.results[0].latitude,
      longitude: response.data.results[0].longitude
    };

    console.log('Geocoding result:', result);
    return result;
  } catch (error) {
    console.error('Geocoding error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.reason || `Failed to find location "${query}"`);
    }
    throw error instanceof Error ? error : new Error(`Failed to find location "${query}"`);
  }
};

// Weather API to get current weather and forecast
export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    console.log('Fetching weather for coordinates:', { latitude, longitude });

    // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=3

    // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=3
    
    const response = await axios.get(`${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=3`);

    console.log('Weather API raw response:', response.data);

    // Transform the data to match our WeatherData interface
    const transformedData: WeatherData = {
      current: {
        temperature_2m: response.data.current.temperature_2m,
        time: response.data.current.time,
        weather_code: response.data.current.weather_code
      },
      daily: {
        time: response.data.daily.time,
        weather_code: response.data.daily.weather_code,
        temperature_2m_max: response.data.daily.temperature_2m_max,
        temperature_2m_min: response.data.daily.temperature_2m_min,
        sunrise: response.data.daily.sunrise,
        sunset: response.data.daily.sunset
      },
      timezone: response.data.timezone
    };

    console.log('Transformed weather data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Weather API error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.reason || 'Failed to fetch weather data');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching weather data');
  }
};
