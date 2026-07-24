import { GeoLocationResult, ForecastResponse } from '../types/weather';

export async function searchCity(cityName: string): Promise<GeoLocationResult> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName
  )}&count=5&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to reach geocoding service.');
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found. Please try another search.');
  }

  return data.results[0] as GeoLocationResult;
}

export async function fetchForecast(lat: number, lon: number): Promise<ForecastResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,wind_speed_10m_max&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch weather forecast data.');
  }

  const data = await res.json();
  if (!data.current_weather || !data.daily) {
    throw new Error('Incomplete forecast data returned from API.');
  }

  return data as ForecastResponse;
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeoLocationResult> {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(2)},${lon.toFixed(
      2
    )}&count=1&language=en&format=json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
    }
  } catch {
    // Fallback if reverse geocode name lookup fails
  }

  return {
    id: 0,
    name: 'Your Location',
    latitude: lat,
    longitude: lon,
    country: 'Current Area',
    country_code: 'GPS',
  };
}
