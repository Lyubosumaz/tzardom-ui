import { defineConfig, devices } from '@playwright/test'

const STORYBOOK_URL = 'http://localhost:6006'

export default defineConfig({
  testDir: './tests',
  forbidOnly: Boolean(process.env.CI),
  use: { baseURL: STORYBOOK_URL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm --filter @tzardom-ui/storybook run storybook --ci',
    url: STORYBOOK_URL,
    reuseExistingServer: !process.env.CI,
  },
})
