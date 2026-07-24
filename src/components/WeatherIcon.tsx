import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudHail,
  CloudLightning,
  Snowflake,
  Wind,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6', size }) => {
  const props = { className, size };

  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'SunMedium':
      return <SunMedium {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'CloudRainWind':
      return <CloudRainWind {...props} />;
    case 'CloudHail':
      return <CloudHail {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    default:
      return <CloudSun {...props} />;
  }
};
