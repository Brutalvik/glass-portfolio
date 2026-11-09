import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);

/**
 * Browser tests. Run against a production build:
 *   npm run build && npm run test:e2e
 * Locally you can point at an installed Chrome with CHROME_PATH=/path/to/chrome;
 * CI installs Playwright's Chromium instead.
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
    launchOptions: process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : undefined,
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
      testMatch: /smoke\.spec\.ts/,
    },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    // No email provider in tests: the contact API answers 503 unless a test mocks it
    env: { SMTP_HOST: "", RESEND_API_KEY: "", CONTACT_RATE_LIMIT: "1000" },
  },
});
