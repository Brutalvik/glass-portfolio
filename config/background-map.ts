// Time-of-day backgrounds. All images are the same scene, so crossfades are seamless.
// Source PNGs were converted to 2560px WebP in /public/bg (plus tiny *-lqip.webp placeholders).

export const BACKGROUNDS = {
  midnight: "midnight",
  night: "night",
  dawn: "dawn",
  morning: "morning",
  beforeNoon: "before-noon",
  noon: "noon",
  afternoon: "afternoon",
  beforeEvening: "before-evening",
  evening: "evening",
  afterEvening: "after-evening",
  beforeDusk: "before-dusk",
  dusk: "dusk",
} as const;

export type BackgroundKey = (typeof BACKGROUNDS)[keyof typeof BACKGROUNDS];

export const getBackgroundKey = (hour: number): BackgroundKey => {
  if (hour < 3) return BACKGROUNDS.midnight;
  if (hour < 5) return BACKGROUNDS.night;
  if (hour < 7) return BACKGROUNDS.dawn;
  if (hour < 9) return BACKGROUNDS.morning;
  if (hour < 11) return BACKGROUNDS.beforeNoon;
  if (hour < 13) return BACKGROUNDS.noon;
  if (hour < 15) return BACKGROUNDS.afternoon;
  if (hour < 17) return BACKGROUNDS.beforeEvening;
  if (hour < 18) return BACKGROUNDS.evening;
  if (hour < 19) return BACKGROUNDS.afterEvening;
  if (hour < 20) return BACKGROUNDS.beforeDusk;
  if (hour < 21) return BACKGROUNDS.dusk;

  return BACKGROUNDS.night;
};

export const backgroundSrc = (key: BackgroundKey) => `/bg/${key}.webp`;
export const backgroundLqip = (key: BackgroundKey) => `/bg/${key}-lqip.webp`;
