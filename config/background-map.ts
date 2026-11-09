// Time-of-day backgrounds. Every image is the same scene, so crossfades are seamless.
// Files live in /public/bg as <key>-1280.webp, <key>-2560.webp and <key>-lqip.webp.
// Regenerate with `npm run images -- <source_dir>`.

export type Scene = {
  key: string;
  label: string;
  /** First hour (0-23) this scene is shown in auto mode */
  from: number;
  theme: "light" | "dark";
};

// Ordered through the day. Auto mode picks the last scene whose `from` <= current hour.
export const SCENES: Scene[] = [
  { key: "midnight", label: "Midnight", from: 0, theme: "dark" },
  { key: "night", label: "Night", from: 3, theme: "dark" },
  { key: "dawn", label: "Dawn", from: 5, theme: "dark" },
  { key: "morning", label: "Morning", from: 7, theme: "light" },
  { key: "before-noon", label: "Late morning", from: 9, theme: "light" },
  { key: "noon", label: "Noon", from: 11, theme: "light" },
  { key: "afternoon", label: "Afternoon", from: 13, theme: "light" },
  { key: "before-evening", label: "Late afternoon", from: 15, theme: "light" },
  { key: "evening", label: "Golden hour", from: 17, theme: "dark" },
  { key: "after-evening", label: "Sunset", from: 18, theme: "dark" },
  { key: "before-dusk", label: "Twilight", from: 19, theme: "dark" },
  { key: "dusk", label: "Dusk", from: 20, theme: "dark" },
];

// After dusk the night scene returns until midnight
const LATE_NIGHT = { from: 21, index: 1 };

export const sceneIndexForHour = (hour: number): number => {
  if (hour >= LATE_NIGHT.from) return LATE_NIGHT.index;
  let idx = 0;

  SCENES.forEach((s, i) => {
    if (hour >= s.from) idx = i;
  });

  return idx;
};

export const bgSrc = (key: string, w: 1280 | 2560) => `/bg/${key}-${w}.webp`;
export const bgSrcSet = (key: string) =>
  `${bgSrc(key, 1280)} 1280w, ${bgSrc(key, 2560)} 2560w`;
export const bgLqip = (key: string) => `/bg/${key}-lqip.webp`;

/**
 * Inline script for <head>: picks the scene before first paint so the theme
 * does not flash and the right background starts downloading immediately.
 */
export const sceneBootScript = `(function(){try{
var S=${JSON.stringify(SCENES.map((s) => [s.key, s.from, s.theme]))};
var h=new Date().getHours(),i=0;
if(h>=${LATE_NIGHT.from}){i=${LATE_NIGHT.index}}else{for(var j=0;j<S.length;j++){if(h>=S[j][1])i=j}}
var k=S[i][0],d=document.documentElement;
d.dataset.theme=S[i][2];d.dataset.scene=k;
var l=document.createElement('link');l.rel='preload';l.as='image';l.type='image/webp';
l.setAttribute('imagesrcset','/bg/'+k+'-1280.webp 1280w, /bg/'+k+'-2560.webp 2560w');
l.setAttribute('imagesizes','100vw');l.setAttribute('fetchpriority','high');
document.head.appendChild(l);
}catch(e){}})();`;
