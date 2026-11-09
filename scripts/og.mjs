// Renders Open Graph images (1200x630) with headless Chrome.
// Usage: node scripts/og.mjs   (needs playwright-core and Chrome; see README)
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = process.cwd();
const f = (p) => pathToFileURL(`${root}/${p}`).href;

const css = `
@font-face{font-family:Inter;src:url(${f("node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2")})}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;font-family:Inter,sans-serif;overflow:hidden;position:relative;color:#fff}
.bg{position:absolute;inset:0;background:url(${f("public/bg/after-evening-2560.webp")}) center/cover}
.veil{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.5))}
.card{position:absolute;left:64px;top:64px;bottom:64px;padding:48px 52px;border-radius:44px;display:flex;flex-direction:column;
background:linear-gradient(140deg,rgba(255,255,255,.2),rgba(255,255,255,.05) 40%,rgba(255,255,255,.1)),rgba(16,18,28,.34);
backdrop-filter:blur(40px) saturate(190%);border:1px solid rgba(255,255,255,.25);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 30px 80px -20px rgba(0,0,0,.6)}
.brand{display:flex;align-items:center;gap:16px;font-size:24px;font-weight:600}
.logo{font-size:40px;font-weight:800;letter-spacing:-.06em;line-height:1}
.bar{width:2px;height:28px;background:rgba(255,255,255,.4)}
.eyebrow{font-size:18px;letter-spacing:.16em;text-transform:uppercase;opacity:.7;font-weight:600;margin-top:auto}
h1{font-size:68px;letter-spacing:-.03em;font-weight:700;margin-top:14px;line-height:1.02}
h2{font-size:26px;font-weight:500;margin-top:16px;opacity:.88;line-height:1.3}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
.chip{font-size:18px;padding:7px 16px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22)}
.shot{position:absolute;right:-60px;top:110px;width:560px;border-radius:24px;padding:8px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);box-shadow:0 30px 80px -20px rgba(0,0,0,.7);backdrop-filter:blur(20px)}
.shot img{width:100%;display:block;border-radius:18px}
`;

const page = ({ eyebrow, title, sub, chips, width = 760, shot, brand = true }) => `<!doctype html><html><head><style>${css}</style></head><body>
<div class=bg></div><div class=veil></div>
${shot ? `<div class=shot><img src="${f(shot)}"></div>` : ""}
<div class=card style="width:${width}px">
  <div class=brand><span class=logo>vk.</span>${brand ? "<span class=bar></span><span>Vikram Kumar</span>" : ""}</div>
  <div class=eyebrow>${eyebrow}</div><h1>${title}</h1><h2>${sub}</h2>
  <div class=chips>${chips.map((c) => `<span class=chip>${c}</span>`).join("")}</div>
</div></body></html>`;

const jobs = [
  {
    out: "public/og.jpg",
    eyebrow: "Senior Full Stack Developer - Calgary",
    title: "Vikram Kumar",
    sub: "React, React Native and Angular on typed Node.js, Spring Boot and cloud platforms.",
    brand: false,
    chips: ["React", "React Native", "Angular", "Node.js", "Spring Boot", "SQL / NoSQL", "Azure", "AWS"],
    width: 860,
  },
  {
    out: "public/og/torqlab.jpg",
    eyebrow: "Case study",
    title: "TorqLab Automotive",
    sub: "Booking site and quote API for my mobile auto service.",
    chips: ["React", "Three.js", "Express", "Zod"],
    width: 640,
    shot: "public/case-studies/torqlab/hero.webp",
  },
  {
    out: "public/og/cervv.jpg",
    eyebrow: "Case study",
    title: "Cervv",
    sub: "Keeping a growing React Native app consistent and type-safe.",
    chips: ["React Native", "TypeScript", "Design tokens", "Shared contracts"],
  },
  {
    out: "public/og/aer-bulk-submission.jpg",
    eyebrow: "Case study - Alberta Energy Regulator",
    title: "Regulatory Bulk Submission",
    sub: "Validating and loading large regulatory spreadsheets, with errors shown as you type.",
    chips: ["React", "Node.js", "T-SQL", "Azure", "Kubernetes"],
    width: 900,
  },
];

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--allow-file-access-from-files"],
});
const p = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const j of jobs) {
  const html = `${root}/.og-tmp.html`;

  writeFileSync(html, page(j));
  await p.goto(pathToFileURL(html).href);
  await p.waitForTimeout(500);
  await p.screenshot({ path: j.out, type: "jpeg", quality: 86 });
  console.log("wrote", j.out);
}
await browser.close();
