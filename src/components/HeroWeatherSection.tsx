import React from 'react';
import { WeatherIcon } from './WeatherIcon';
import {
  GeoLocationResult,
  ForecastResponse,
  IntelligenceBriefing,
} from '../types/weather';
import {
  getWmoCondition,
  formatTemp,
  getWindDirection,
  formatTimeInTimezone,
} from '../utils/weatherUtils';
import { Wind, Thermometer, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroWeatherSectionProps {
  location: GeoLocationResult;
  forecast: ForecastResponse;
  unit: 'C' | 'F';
  briefing: IntelligenceBriefing;
}

export const HeroWeatherSection: React.FC<HeroWeatherSectionProps> = ({
  location,
  forecast,
  unit,
  briefing,
}) => {
  const current = forecast.current_weather;
  const condition = getWmoCondition(current.weathercode);
  const windDir = getWindDirection(current.winddirection);
  const localTimeStr = formatTimeInTimezone(location.timezone || forecast.timezone);

  const apparentTempC = forecast.hourly?.apparent_temperature?.[0] ?? current.temperature;

  return (
    <div className="flex flex-col justify-between gap-8 h-full">
      {/* Location & Local Time Header */}
      <section>
        <div className="flex items-baseline gap-2 mb-1">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            {location.name}
          </h2>
          {location.country_code && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-gray-300 uppercase tracking-widest">
              {location.country_code}
            </span>
          )}
        </div>
        <p className="text-lg md:text-xl text-gray-400 font-light">
          {location.admin1 ? `${location.admin1}, ` : ''}
          {location.country || 'Region'} ·{' '}
          <span className="text-gray-300 font-normal">{localTimeStr}</span>
        </p>
      </section>

      {/* Hero Temperature & Primary Condition Display */}
      <section className="flex flex-wrap items-end gap-6 lg:gap-10 my-4">
        <span className="font-serif italic text-8xl md:text-9xl lg:text-[130px] leading-none text-white tracking-tight select-none">
          {formatTemp(current.temperature, unit)}
        </span>

        <div className="mb-2 max-w-sm">
          <div className="flex items-center gap-2.5 mb-1">
            <WeatherIcon name={condition.iconName} className="w-8 h-8 text-white/90" />
            <p className="text-2xl md:text-3xl font-light text-white tracking-wide">
              {condition.label}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 font-light mt-1">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-gray-500" />
              Feels like {formatTemp(apparentTempC, unit)}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-gray-500" />
              Wind {Math.round(current.windspeed)} km/h {windDir}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic leading-relaxed">
            {condition.description}
          </p>
        </div>
      </section>

      {/* Intelligence Briefing Box (Matching Design Theme) */}
      <section className="border-l-2 border-white pl-5 py-1 mb-2 bg-white/[0.015] rounded-r-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-[#9e9e9e] tracking-[0.15em] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Intelligence Briefing
          </span>
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">
            {briefing.headline}
          </span>
        </div>

        <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed mb-4">
          {briefing.recommendation}
        </p>

        {/* Dynamic Clothing & Activity Tips */}
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-500 font-medium uppercase text-[10px] tracking-wider">
              Gear/Outfit:
            </span>
            {briefing.clothingTips.map((tip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {tip}
              </span>
            ))}
          </div>

          {(briefing.uvAdvice || briefing.windAdvice) && (
            <div className="flex items-start gap-2 pt-1 text-gray-400 text-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {briefing.uvAdvice} {briefing.windAdvice}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
