import React from 'react';
import { ForecastResponse } from '../types/weather';
import { Droplets, Sun, Gauge, Wind, Sunrise, Sunset, Umbrella } from 'lucide-react';

interface AtmosphericsSectionProps {
  forecast: ForecastResponse;
}

export const AtmosphericsSection: React.FC<AtmosphericsSectionProps> = ({ forecast }) => {
  const hourly = forecast.hourly;
  const daily = forecast.daily;

  const currentHumidity = hourly?.relative_humidity_2m?.[0] ?? '--';
  const currentPressure = hourly?.surface_pressure?.[0] ? `${Math.round(hourly.surface_pressure[0])} hPa` : '--';
  const maxUv = daily?.uv_index_max?.[0] ?? hourly?.uv_index?.[0] ?? 0;
  const maxWind = daily?.wind_speed_10m_max?.[0] ?? forecast.current_weather.windspeed;
  const precipSum = daily?.precipitation_sum?.[0] ?? 0;

  let uvLabel = 'Low';
  let uvColor = 'text-emerald-400';
  if (maxUv >= 8) {
    uvLabel = 'Very High';
    uvColor = 'text-purple-400';
  } else if (maxUv >= 6) {
    uvLabel = 'High';
    uvColor = 'text-amber-400';
  } else if (maxUv >= 3) {
    uvLabel = 'Moderate';
    uvColor = 'text-yellow-400';
  }

  // Format sunrise/sunset
  const formatSunTime = (isoTimeStr?: string) => {
    if (!isoTimeStr) return '--:--';
    try {
      const date = new Date(isoTimeStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return isoTimeStr.split('T')[1] || isoTimeStr;
    }
  };

  const sunriseStr = formatSunTime(daily?.sunrise?.[0]);
  const sunsetStr = formatSunTime(daily?.sunset?.[0]);

  return (
    <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 flex flex-col justify-between gap-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <span className="text-[11px] font-semibold text-[#9e9e9e] tracking-[0.15em] uppercase">
          Atmospherics
        </span>
        <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Sensor Data
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {/* Humidity */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            Humidity
          </span>
          <span className="text-xl lg:text-2xl font-light text-white font-mono">
            {currentHumidity}%
          </span>
        </div>

        {/* UV Index */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            UV Index
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl lg:text-2xl font-light text-white font-mono">
              {Math.round(maxUv)}
            </span>
            <span className={`text-xs font-medium ${uvColor}`}>{uvLabel}</span>
          </div>
        </div>

        {/* Pressure */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Gauge className="w-3.5 h-3.5 text-teal-400" />
            Pressure
          </span>
          <span className="text-xl lg:text-2xl font-light text-white font-mono">
            {currentPressure}
          </span>
        </div>

        {/* Max Wind */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Wind className="w-3.5 h-3.5 text-sky-400" />
            Max Wind
          </span>
          <span className="text-xl lg:text-2xl font-light text-white font-mono">
            {Math.round(maxWind)} <span className="text-xs text-gray-500 font-sans">km/h</span>
          </span>
        </div>

        {/* Precipitation Sum */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Umbrella className="w-3.5 h-3.5 text-indigo-400" />
            Precipitation
          </span>
          <span className="text-xl lg:text-2xl font-light text-white font-mono">
            {precipSum.toFixed(1)} <span className="text-xs text-gray-500 font-sans">mm</span>
          </span>
        </div>

        {/* Sunrise / Sunset */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Sunrise className="w-3.5 h-3.5 text-amber-300" />
            Sun Schedule
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-300 font-mono">
            <span className="flex items-center gap-1" title="Sunrise">
              <Sunrise className="w-3 h-3 text-amber-400" /> {sunriseStr}
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1" title="Sunset">
              <Sunset className="w-3 h-3 text-orange-400" /> {sunsetStr}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
