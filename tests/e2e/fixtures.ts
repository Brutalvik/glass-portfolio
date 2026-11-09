import { test as base, expect } from "@playwright/test";

/** Freeze the clock at a given local hour so the background scene is predictable */
export const atHour = (hour: number) => `(() => {
  const D = Date;
  const fixed = new D(2026, 10, 9, ${hour}, 30, 0).getTime();
  // eslint-disable-next-line no-global-assign
  Date = class extends D {
    constructor(...a) { super(...(a.length ? a : [fixed])); }
    static now() { return fixed; }
  };
})()`;

export const test = base.extend<{ hour: number }>({
  hour: [12, { option: true }],
  page: async ({ page, hour }, use) => {
    await page.addInitScript(atHour(hour));
    // Reveal animations: skip them so elements are visible immediately
    await page.emulateMedia({ reducedMotion: "reduce" });
    await use(page);
  },
});

export { expect };
