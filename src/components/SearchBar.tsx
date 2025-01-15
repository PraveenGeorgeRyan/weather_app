'use client';

import { useState, FormEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchInput);
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-24 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          className="absolute right-1 px-6 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
};
