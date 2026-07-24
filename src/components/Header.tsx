import React, { useState } from 'react';
import { Search, Navigation, Compass } from 'lucide-react';
import { GeoLocationResult } from '../types/weather';

interface HeaderProps {
  onSearch: (cityName: string) => void;
  onSelectGeo?: (geo: GeoLocationResult) => void;
  onUseCurrentLocation: () => void;
  unit: 'C' | 'F';
  onToggleUnit: () => void;
  isLoading: boolean;
}

const POPULAR_CITIES = ['Zurich', 'Tokyo', 'San Francisco', 'London', 'Paris', 'Sydney', 'New York'];

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onUseCurrentLocation,
  unit,
  onToggleUnit,
  isLoading,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleCityClick = (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <header className="flex flex-col gap-6 mb-8 lg:mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Branding */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-[#9e9e9e] tracking-[0.15em] uppercase mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-white/60 animate-spin-slow" />
            Weather Intelligence
          </span>
          <h1 className="font-serif italic text-3xl md:text-4xl tracking-tight text-white font-normal">
            AETHER
          </h1>
        </div>

        {/* Controls: Search Bar & Unit Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar Form */}
          <form onSubmit={handleSubmit} className="relative flex-1 md:w-80 lg:w-96">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city (e.g. Zurich, Tokyo)..."
              disabled={isLoading}
              className="w-full bg-[#121212] border border-[#222222] py-3 pl-5 pr-12 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all shadow-inner disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              title="Search City"
              className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Current Location Button */}
          <button
            onClick={onUseCurrentLocation}
            disabled={isLoading}
            title="Use current geolocation"
            className="p-3 bg-[#121212] border border-[#222222] hover:border-white text-gray-300 hover:text-white rounded-full transition-all flex items-center justify-center shrink-0 active:scale-95 disabled:opacity-50"
          >
            <Navigation className="w-4 h-4" />
          </button>

          {/* Unit Switcher Button */}
          <button
            onClick={onToggleUnit}
            title="Toggle Celsius / Fahrenheit"
            className="px-3.5 py-2.5 bg-[#121212] border border-[#222222] hover:border-white rounded-full text-xs font-semibold text-gray-300 hover:text-white transition-all shrink-0 active:scale-95 tracking-wider"
          >
            {unit === 'C' ? '°C | °F' : '°F | °C'}
          </button>
        </div>
      </div>

      {/* Quick City Selection Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-gray-500 font-medium shrink-0 uppercase tracking-widest text-[10px]">
          Quick:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className="px-3 py-1 bg-white/[0.03] hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full text-gray-300 hover:text-white transition-all shrink-0 text-xs"
          >
            {city}
          </button>
        ))}
      </div>
    </header>
  );
};
