'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData, geocodeLocation } from '../services/weatherApi';
import { WeatherData } from '../types/weather';
import { useState, useEffect } from 'react';

export const useWeather = (locationQuery: string) => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  // Reset coordinates when location query changes
  useEffect(() => {
    console.log('Location query changed:', locationQuery);
    setCoordinates(null);
  }, [locationQuery]);

    // coordinates changed
    useEffect(() => {
      console.log('Coordinates changed:', coordinates);
    }, [coordinates]);

  // First query to get coordinates from location name
  const geocodingQuery = useQuery({
    queryKey: ['geocoding', locationQuery],
    queryFn: async () => {
      console.log('Starting geocoding query for:', locationQuery);
      const result = await geocodeLocation(locationQuery);
      console.log('Geocoding query result:', result);
      setCoordinates(result);
      return result;
    },
    enabled: !!locationQuery && locationQuery.length > 0,
    retry: 1,
  });

  // Second query to get weather data using coordinates
  const weatherQuery = useQuery<WeatherData, Error>({
    queryKey: ['weather', coordinates?.latitude, coordinates?.longitude],
    queryFn: async () => {
      if (!coordinates) {
        console.error('No coordinates available for weather query');
        throw new Error('No coordinates available');
      }
      console.log('Starting weather query for coordinates:', coordinates);
      const result = await fetchWeatherData(coordinates.latitude, coordinates.longitude);
      console.log('Weather query result:', result);
      return result;
    },
    enabled: !!coordinates?.latitude && !!coordinates?.longitude,
    retry: 1,
  });

  // Combine loading states and errors
  const isLoading = geocodingQuery.isLoading || (geocodingQuery.isSuccess && weatherQuery.isLoading);
  const error = geocodingQuery.error || weatherQuery.error;

  console.log('useWeather hook state:', {
    locationQuery,
    coordinates,
    isLoading,
    error: error?.message,
    hasData: !!weatherQuery.data
  });

  return {
    data: weatherQuery.data,
    isLoading,
    error: error as Error | null,
  };
};
