'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCitySuggestions } from '../hooks/useCitySuggestions';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const { suggestions, isLoading } = useCitySuggestions(query);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cityName: string) => {
    setQuery(cityName);
    onSearch(cityName);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-gray-800 placeholder-gray-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && query.length >= 2 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto border border-gray-200">
          {isLoading ? (
            <div className="px-4 py-3 text-gray-500">Loading suggestions...</div>
          ) : suggestions.length > 0 ? (
            <ul className="py-1">
              {suggestions.map((city) => (
                <li
                  key={city.fullName}
                  onClick={() => handleSuggestionClick(city.name)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{city.name}</span>
                    <span className="text-sm text-gray-500 mt-0.5">
                      {[city.state, city.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-gray-500">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
};
