import { defineConfig, devices } from '@playwright/test'

const STORYBOOK_URL = 'http://localhost:6006'

export default defineConfig({
  testDir: './tests',
  // A test.only left in by mistake fails the run on CI instead of skipping the rest.
  forbidOnly: Boolean(process.env.CI),
  use: { baseURL: STORYBOOK_URL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // The tests open the components' stories, so Playwright starts Storybook
  // first. Locally it reuses one that is already running.
  webServer: {
    command: 'pnpm --filter @tzardom-ui/storybook run storybook --ci',
    url: STORYBOOK_URL,
    reuseExistingServer: !process.env.CI,
  },
})
