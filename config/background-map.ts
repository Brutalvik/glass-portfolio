// config/background-map.ts

// Replace these filenames with your actual generated files
const IMAGE_PATHS = {
  midnight: "/backgrounds/00-midnight.jpg",
  deepNight: "/backgrounds/03-deep-night.jpg",
  dawn: "/backgrounds/05-dawn.jpg",
  sunrise: "/backgrounds/06-sunrise.jpg",
  morning: "/backgrounds/08-morning.jpg",
  midMorning: "/backgrounds/10-mid-morning.jpg",
  noon: "/backgrounds/12-noon.jpg",
  afterNoon: "/backgrounds/14-after-noon.jpg",
  lateAfternoon: "/backgrounds/16-late-afternoon.jpg",
  goldenHour: "/backgrounds/17-golden-hour.jpg",
  sunset: "/backgrounds/18-sunset.jpg",
  dusk: "/backgrounds/19-dusk.jpg",
  nightfall: "/backgrounds/21-nightfall.jpg",
};

export const getBackgroundImage = (hour: number): string => {
  if (hour >= 0 && hour < 3) return IMAGE_PATHS.midnight;
  if (hour >= 3 && hour < 5) return IMAGE_PATHS.deepNight;
  if (hour >= 5 && hour < 6) return IMAGE_PATHS.dawn;
  if (hour >= 6 && hour < 8) return IMAGE_PATHS.sunrise;
  if (hour >= 8 && hour < 10) return IMAGE_PATHS.morning;
  if (hour >= 10 && hour < 12) return IMAGE_PATHS.midMorning;
  if (hour === 12 || hour === 13) return IMAGE_PATHS.noon;
  if (hour >= 14 && hour < 16) return IMAGE_PATHS.afterNoon;
  if (hour >= 16 && hour < 17) return IMAGE_PATHS.lateAfternoon;
  if (hour === 17) return IMAGE_PATHS.goldenHour;
  if (hour === 18) return IMAGE_PATHS.sunset;
  if (hour >= 19 && hour < 21) return IMAGE_PATHS.dusk;
  // 21 to 23
  return IMAGE_PATHS.nightfall;
};