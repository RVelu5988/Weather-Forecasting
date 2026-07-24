import React from 'react';
import { ForecastResponse } from '../types/weather';
import { formatTemp, getWmoCondition } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Clock } from 'lucide-react';

interface HourlyTrendSectionProps {
  forecast: ForecastResponse;
  unit: 'C' | 'F';
}

export const HourlyTrendSection: React.FC<HourlyTrendSectionProps> = ({ forecast, unit }) => {
  const hourly = forecast.hourly;
  if (!hourly || !hourly.time || hourly.time.length === 0) return null;

  // Next 24 hours
  const hours = hourly.time.slice(0, 24).map((timeStr, idx) => {
    const date = new Date(timeStr);
    const hourFormatted = idx === 0 ? 'Now' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const tempC = hourly.temperature_2m[idx];
    const code = hourly.weather_code[idx];
    const precipProb = hourly.precipitation_probability?.[idx] ?? 0;
    const cond = getWmoCondition(code);

    return {
      hourFormatted,
      tempC,
      code,
      cond,
      precipProb,
    };
  });

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 lg:p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold text-[#9e9e9e] tracking-[0.15em] uppercase flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-white/70" />
          24-Hour Forecast Timeline
        </span>
        <span className="text-xs text-gray-500">Hourly Atmospheric Progression</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {hours.map((h, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-between min-w-[70px] p-3 rounded-xl border transition-all ${
              idx === 0
                ? 'bg-white/10 border-white/30 text-white shadow-lg'
                : 'bg-white/[0.02] hover:bg-white/5 border-white/5 text-gray-300'
            }`}
          >
            <span className="text-xs font-mono text-gray-400 mb-2">{h.hourFormatted}</span>
            <div className="my-1">
              <WeatherIcon name={h.cond.iconName} className="w-5 h-5 text-white/90" />
            </div>
            <span className="text-base font-medium font-mono my-2">
              {formatTemp(h.tempC, unit)}
            </span>
            {h.precipProb > 5 ? (
              <span className="text-[10px] text-sky-400 font-mono font-medium">
                {h.precipProb}%
              </span>
            ) : (
              <span className="text-[10px] text-gray-600 font-mono">-</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
