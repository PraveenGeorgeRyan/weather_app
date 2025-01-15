import { useState, useEffect } from 'react';
import axios from 'axios';

interface City {
  name: string;
  country: string;
  state?: string;
  latitude: number;
  longitude: number;
  fullName: string;
  population?: number;
}

export const useCitySuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            query
          )}&count=15&language=en&format=json`
        );

        const results = response.data.results || [];
        
        // Filter and process cities
        const processedCities = results
          .map((result: any) => ({
            name: result.name,
            country: result.country,
            state: result.admin1,
            latitude: result.latitude,
            longitude: result.longitude,
            population: result.population,
            fullName: [
              result.name,
              result.admin1,
              result.country
            ].filter(Boolean).join(', ')
          }))
          .filter((city: City) => {
            // Filter out potentially incorrect entries
            if (city.name.toLowerCase() === 'hyderabad') {
              // For Hyderabad, only allow the two main cities
              return (
                (city.country === 'India' && city.state === 'Telangana') ||
                (city.country === 'Pakistan' && city.state === 'Sindh')
              );
            }
            return true;
          });

        // Sort cities by relevance
        const sortedCities = processedCities.sort((a, b) => {
          // Exact name matches first
          const aExact = a.name.toLowerCase() === query.toLowerCase();
          const bExact = b.name.toLowerCase() === query.toLowerCase();
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;

          // Then by population (if available)
          if (a.population && b.population) {
            return b.population - a.population;
          }

          // Finally alphabetically
          return a.fullName.localeCompare(b.fullName);
        });

        // Remove duplicates and keep only the most relevant entries
        const uniqueCities = sortedCities.reduce((acc: City[], current: City) => {
          const isDuplicate = acc.some(city => 
            city.name.toLowerCase() === current.name.toLowerCase() &&
            city.country === current.country &&
            (!city.state || !current.state || city.state === current.state)
          );
          
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);

        setSuggestions(uniqueCities.slice(0, 5));
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, isLoading };
};
