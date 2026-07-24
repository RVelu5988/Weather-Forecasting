export interface GeoLocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
  is_day: number;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  weather_code: number[];
  surface_pressure: number[];
  wind_speed_10m: number[];
  uv_index: number[];
}

export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  hourly?: HourlyData;
  daily: DailyData;
}

export interface WeatherConditionInfo {
  label: string;
  iconName: string;
  description: string;
  bgGradient: string;
}

export interface IntelligenceBriefing {
  headline: string;
  recommendation: string;
  clothingTips: string[];
  activityAdvice: string;
  uvAdvice: string;
  windAdvice: string;
}
