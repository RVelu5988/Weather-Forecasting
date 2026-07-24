import React, { useState } from 'react';
import { DailyData } from '../types/weather';
import { formatDayName, formatTemp, getWmoCondition } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Calendar } from 'lucide-react';

interface SevenDayForecastSectionProps {
  daily: DailyData;
  unit: 'C' | 'F';
}

export const SevenDayForecastSection: React.FC<SevenDayForecastSectionProps> = ({ daily, unit }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  if (!daily || !daily.time) return null;

  return (
    <section className="mt-8 lg:mt-12">
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-[11px] font-semibold text-[#9e9e9e] tracking-[0.15em] uppercase flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-white/70" />
          7-Day Intelligence Outlook
        </span>
        <span className="text-xs text-gray-500 font-mono">Select day to inspect detail</span>
      </div>

      {/* 7 Day Cards Container matching theme styling */}
      <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/5">
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const { dayShort, dateFormatted } = formatDayName(dateStr, idx);
          const maxTemp = daily.temperature_2m_max[idx];
          const minTemp = daily.temperature_2m_min[idx];
          const code = daily.weather_code[idx];
          const precip = daily.precipitation_sum?.[idx] ?? 0;
          const condition = getWmoCondition(code);
          const isSelected = selectedDayIndex === idx;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex-1 text-center py-5 px-3 transition-all outline-none flex flex-row md:flex-col items-center justify-between md:justify-center cursor-pointer ${
                isSelected
                  ? 'bg-white/10 shadow-inner border-t-2 md:border-t-0 md:border-b-2 border-white'
                  : 'hover:bg-white/[0.05]'
              }`}
            >
              {/* Day & Date */}
              <div className="text-left md:text-center">
                <p className="text-[11px] font-semibold text-[#9e9e9e] tracking-[0.1em] uppercase">
                  {dayShort}
                </p>
                <p className="text-[10px] text-gray-500 font-mono">{dateFormatted}</p>
              </div>

              {/* Weather Icon */}
              <div className="h-10 md:h-12 flex items-center justify-center my-2 md:my-4">
                <WeatherIcon name={condition.iconName} className="w-7 h-7 text-white" />
              </div>

              {/* High & Low Temp */}
              <div className="text-right md:text-center">
                <p className="text-lg font-medium text-white font-mono">
                  {formatTemp(maxTemp, unit)}
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  {formatTemp(minTemp, unit)}
                </p>
                {precip > 0.5 && (
                  <p className="text-[10px] text-sky-400 font-mono mt-1">
                    {precip.toFixed(1)} mm
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Inspection Banner */}
      {daily.time[selectedDayIndex] && (
        <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium font-serif italic text-sm">
              {formatDayName(daily.time[selectedDayIndex], selectedDayIndex).dayShort} Detailed Outlook:
            </span>
            <span className="text-gray-400">
              {getWmoCondition(daily.weather_code[selectedDayIndex]).label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-400 font-mono">
            <span>
              Max: <strong className="text-white">{formatTemp(daily.temperature_2m_max[selectedDayIndex], unit)}</strong>
            </span>
            <span>
              Min: <strong className="text-gray-300">{formatTemp(daily.temperature_2m_min[selectedDayIndex], unit)}</strong>
            </span>
            <span>
              Precipitation: <strong className="text-sky-300">{daily.precipitation_sum?.[selectedDayIndex] ?? 0} mm</strong>
            </span>
            <span>
              Max Wind: <strong className="text-gray-300">{daily.wind_speed_10m_max?.[selectedDayIndex] ?? '--'} km/h</strong>
            </span>
            <span>
              Max UV: <strong className="text-amber-300">{daily.uv_index_max?.[selectedDayIndex] ?? '--'}</strong>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
