import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroWeatherSection } from './components/HeroWeatherSection';
import { AtmosphericsSection } from './components/AtmosphericsSection';
import { HourlyTrendSection } from './components/HourlyTrendSection';
import { SevenDayForecastSection } from './components/SevenDayForecastSection';
import { ErrorBanner } from './components/ErrorBanner';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { GeoLocationResult, ForecastResponse, IntelligenceBriefing } from './types/weather';
import { searchCity, fetchForecast, reverseGeocode } from './services/weatherApi';
import { generateIntelligenceBriefing } from './utils/weatherUtils';

const DEFAULT_CITY = 'Zurich';

export default function App() {
  const [location, setLocation] = useState<GeoLocationResult | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>(DEFAULT_CITY);

  const loadWeatherForGeo = useCallback(async (geo: GeoLocationResult) => {
    setIsLoading(true);
    setError(null);
    try {
      const forecastData = await fetchForecast(geo.latitude, geo.longitude);
      setLocation(geo);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to retrieve weather data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    async (cityName: string) => {
      if (!cityName.trim()) return;
      setCurrentQuery(cityName);
      setIsLoading(true);
      setError(null);

      try {
        const geoResult = await searchCity(cityName);
        await loadWeatherForGeo(geoResult);
      } catch (err) {
        setIsLoading(false);
        setError(
          err instanceof Error
            ? err.message
            : 'City not found. Please try another search.'
        );
      }
    },
    [loadWeatherForGeo]
  );

  const handleCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const geoResult = await reverseGeocode(lat, lon);
          await loadWeatherForGeo(geoResult);
        } catch {
          handleSearch(DEFAULT_CITY);
        }
      },
      () => {
        // Fall back to default city if location permission denied
        handleSearch(DEFAULT_CITY);
      },
      { timeout: 8000 }
    );
  }, [loadWeatherForGeo, handleSearch]);

  // Initial load
  useEffect(() => {
    handleSearch(DEFAULT_CITY);
  }, [handleSearch]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  // Derive briefing recommendations if forecast available
  let briefing: IntelligenceBriefing | null = null;
  if (forecast && location) {
    const cur = forecast.current_weather;
    const daily = forecast.daily;
    briefing = generateIntelligenceBriefing(
      cur.weathercode,
      daily.temperature_2m_max[0] ?? cur.temperature,
      daily.temperature_2m_min[0] ?? cur.temperature,
      cur.temperature,
      cur.windspeed,
      daily.precipitation_sum?.[0] ?? 0,
      daily.uv_index_max?.[0] ?? 0
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between p-4 sm:p-6 md:p-10 lg:p-12 max-w-7xl mx-auto selection:bg-white selection:text-black">
      <div>
        {/* Header with Branding, Search Bar, Quick Picks, Unit Switcher */}
        <Header
          onSearch={handleSearch}
          onUseCurrentLocation={handleCurrentLocation}
          unit={unit}
          onToggleUnit={toggleUnit}
          isLoading={isLoading}
        />

        {/* Error State */}
        {error && (
          <ErrorBanner
            message={error}
            onRetry={() => handleSearch(currentQuery)}
            onResetToDefault={() => handleSearch(DEFAULT_CITY)}
          />
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Main Content Display */}
        {!isLoading && !error && location && forecast && briefing && (
          <main className="flex-1 space-y-8 animate-fadeIn">
            {/* Top Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Hero Weather & Intelligence Briefing */}
              <div className="lg:col-span-7">
                <HeroWeatherSection
                  location={location}
                  forecast={forecast}
                  unit={unit}
                  briefing={briefing}
                />
              </div>

              {/* Right Column: Atmospherics Sensor Card */}
              <div className="lg:col-span-5 flex flex-col justify-end">
                <AtmosphericsSection forecast={forecast} />
              </div>
            </div>

            {/* Hourly 24-Hour Trend */}
            <HourlyTrendSection forecast={forecast} unit={unit} />

            {/* 7-Day Forecast Cards */}
            <SevenDayForecastSection daily={forecast.daily} unit={unit} />
          </main>
        )}
      </div>

      {/* Footer Signature */}
      <footer className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
        <div>
          <span>Powered by </span>
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white underline transition-colors"
          >
            Open-Meteo Public APIs
          </a>
        </div>
        <div>
          <span>AETHER Intelligence · Sophisticated Dark Theme</span>
        </div>
      </footer>
    </div>
  );
}
