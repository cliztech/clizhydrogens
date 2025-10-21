import {defineConfig, devices} from '@playwright/test';

const previewUrl = process.env.PREVIEW_URL || 'https://preview.cheekyprints.shop';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 90_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: previewUrl,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'mobile-chrome',
      use: {...devices['Pixel 7']},
    },
  ],
});
