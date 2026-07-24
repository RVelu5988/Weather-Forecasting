import { IntelligenceBriefing, WeatherConditionInfo } from '../types/weather';

export function getWmoCondition(code: number): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        label: 'Clear Sky',
        iconName: 'Sun',
        description: 'Bright sunshine with clear blue skies.',
        bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
      };
    case 1:
      return {
        label: 'Mainly Clear',
        iconName: 'SunMedium',
        description: 'Mostly sunny with minor scattered clouds.',
        bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        iconName: 'CloudSun',
        description: 'Sun intermittent with broken cloud cover.',
        bgGradient: 'from-blue-500/10 via-slate-500/5 to-transparent',
      };
    case 3:
      return {
        label: 'Overcast',
        iconName: 'Cloud',
        description: 'Dense cloud cover blocking direct sunlight.',
        bgGradient: 'from-slate-500/15 via-zinc-500/5 to-transparent',
      };
    case 45:
    case 48:
      return {
        label: 'Foggy',
        iconName: 'CloudFog',
        description: 'Reduced visibility due to low atmosphere mist.',
        bgGradient: 'from-slate-400/10 via-zinc-500/5 to-transparent',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Drizzle',
        iconName: 'CloudDrizzle',
        description: 'Light fine raindrops falling steadily.',
        bgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        iconName: 'Snowflake',
        description: 'Sub-zero drizzle creating icy surfaces.',
        bgGradient: 'from-sky-300/15 via-blue-500/5 to-transparent',
      };
    case 61:
      return {
        label: 'Slight Rain',
        iconName: 'CloudRain',
        description: 'Gentle rainfall showers expected throughout.',
        bgGradient: 'from-blue-600/15 via-sky-500/5 to-transparent',
      };
    case 63:
      return {
        label: 'Moderate Rain',
        iconName: 'CloudRain',
        description: 'Steady steady rainfall with noticeable accumulation.',
        bgGradient: 'from-blue-700/20 via-sky-600/5 to-transparent',
      };
    case 65:
      return {
        label: 'Heavy Rain',
        iconName: 'CloudRainWind',
        description: 'Intense downpour with heavy water buildup.',
        bgGradient: 'from-blue-800/25 via-indigo-900/10 to-transparent',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        iconName: 'CloudHail',
        description: 'Supercooled rain freezing immediately on contact.',
        bgGradient: 'from-cyan-400/20 via-sky-800/10 to-transparent',
      };
    case 71:
    case 73:
    case 75:
      return {
        label: 'Snowfall',
        iconName: 'Snowflake',
        description: 'Crisp snow flakes falling and accumulating.',
        bgGradient: 'from-indigo-300/15 via-slate-400/5 to-transparent',
      };
    case 77:
      return {
        label: 'Snow Grains',
        iconName: 'Snowflake',
        description: 'Very small white frozen grains falling.',
        bgGradient: 'from-indigo-300/15 via-slate-400/5 to-transparent',
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Rain Showers',
        iconName: 'CloudRain',
        description: 'Passing heavy rain squalls interspersed with clear spots.',
        bgGradient: 'from-blue-600/15 via-sky-500/5 to-transparent',
      };
    case 85:
    case 86:
      return {
        label: 'Snow Showers',
        iconName: 'Snowflake',
        description: 'Intermittent snow flurries with gusty winds.',
        bgGradient: 'from-indigo-300/15 via-slate-400/5 to-transparent',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        iconName: 'CloudLightning',
        description: 'Electrical storms with lightning activity.',
        bgGradient: 'from-purple-900/30 via-indigo-950/20 to-transparent',
      };
    case 96:
    case 99:
      return {
        label: 'Thunderstorm & Hail',
        iconName: 'CloudLightning',
        description: 'Severe convective storm accompanied by hail stones.',
        bgGradient: 'from-purple-900/35 via-indigo-950/25 to-transparent',
      };
    default:
      return {
        label: 'Variable Sky',
        iconName: 'CloudSun',
        description: 'Mild atmospheric variation across the region.',
        bgGradient: 'from-slate-500/10 via-zinc-500/5 to-transparent',
      };
  }
}

export function formatTemp(tempC: number, unit: 'C' | 'F'): string {
  if (unit === 'F') {
    const tempF = Math.round((tempC * 9) / 5 + 32);
    return `${tempF}°`;
  }
  return `${Math.round(tempC)}°`;
}

export function getWindDirection(degree: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index] || 'N';
}

export function generateIntelligenceBriefing(
  code: number,
  tempMaxC: number,
  tempMinC: number,
  currentTempC: number,
  windSpeed: number,
  precipSum: number,
  uvIndexMax: number
): IntelligenceBriefing {
  const clothingTips: string[] = [];
  let headline = '';
  let recommendation = '';
  let activityAdvice = '';
  let uvAdvice = '';
  let windAdvice = '';

  // Rain / Snow / Condition Checks
  const isRain = [51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code) || precipSum > 1.0;
  const isSnow = [71, 73, 75, 77, 85, 86].includes(code);

  if (isRain) {
    headline = 'Wet Atmospheric Activity expected';
    recommendation = 'High probability of precipitation today. Carry an umbrella, waterproof raincoat, and water-resistant footwear.';
    clothingTips.push('Waterproof outer shell or umbrella');
    clothingTips.push('Water-resistant boots or closed shoes');
    activityAdvice = 'Ideal for indoor museums, cafes, or cozy home activities. Drive cautiously on wet roads.';
  } else if (isSnow) {
    headline = 'Freezing Snowfall Conditions';
    recommendation = 'Sub-zero temperatures with active snow. Prepare heavy winter insulated coat, gloves, scarf, and high-traction footwear.';
    clothingTips.push('Heavy down jacket or parka');
    clothingTips.push('Thermal base layers, beanie & gloves');
    activityAdvice = 'Great for winter sports! Ensure vehicle tyres are equipped for ice.';
  } else if (code === 0 || code === 1) {
    headline = 'Optimal Clear & Sunny Sky';
    recommendation = 'Unobstructed sunlight across the area. Great atmospheric clarity for outdoor plans.';
    clothingTips.push('Light breathable fabrics (cotton/linen)');
    clothingTips.push('Sunglasses & sun hat');
    activityAdvice = 'Perfect for outdoor cycling, parks, patio dining, or scenic walks.';
  } else {
    headline = 'Moderate Cloud Cover & Stable Weather';
    recommendation = 'Fair atmospheric stability. Mild temperature fluctuations expected throughout the daylight hours.';
    clothingTips.push('Versatile light layering');
    clothingTips.push('Comfortable everyday shoes');
    activityAdvice = 'Excellent conditions for city exploring, running, or outdoor errands.';
  }

  // Temperature adjustments
  if (currentTempC <= 5) {
    clothingTips.push('Heavy wool coat & thermal gloves');
  } else if (currentTempC <= 15) {
    clothingTips.push('Windbreaker or fleece jacket');
  } else if (currentTempC >= 28) {
    clothingTips.push('Breathable sleeveless tops & shorts');
  }

  // UV Index guidance
  if (uvIndexMax >= 8) {
    uvAdvice = 'Very High UV index: Apply broad-spectrum SPF 50+ sunscreen every 2 hours and seek shade during noon hours.';
  } else if (uvIndexMax >= 5) {
    uvAdvice = 'Moderate to High UV: Sun protection recommended if outdoors for over 20 minutes.';
  } else {
    uvAdvice = 'Low UV exposure expected today.';
  }

  // Wind speed guidance
  if (windSpeed > 35) {
    windAdvice = 'Gale-force gusts over 35 km/h: Secure loose patio items and wear wind-blocking layers.';
  } else if (windSpeed > 20) {
    windAdvice = 'Breezy conditions (wind > 20 km/h): Expect a noticeable chill factor near open water.';
  } else {
    windAdvice = 'Calm to gentle breeze.';
  }

  return {
    headline,
    recommendation,
    clothingTips,
    activityAdvice,
    uvAdvice,
    windAdvice,
  };
}

export function formatDayName(dateStr: string, index: number): { dayShort: string; dateFormatted: string } {
  if (index === 0) {
    const d = new Date(dateStr + 'T00:00:00');
    return {
      dayShort: 'Today',
      dateFormatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  }
  const d = new Date(dateStr + 'T00:00:00');
  return {
    dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
    dateFormatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
}

export function formatTimeInTimezone(timezone?: string): string {
  try {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    if (timezone) {
      options.timeZone = timezone;
    }
    const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
    
    const tzShortOptions: Intl.DateTimeFormatOptions = {
      timeZoneName: 'short',
    };
    if (timezone) tzShortOptions.timeZone = timezone;
    const tzStr = new Intl.DateTimeFormat('en-US', tzShortOptions)
      .formatToParts(now)
      .find((part) => part.type === 'timeZoneName')?.value || '';

    return `${timeStr} ${tzStr}`.trim();
  } catch {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
