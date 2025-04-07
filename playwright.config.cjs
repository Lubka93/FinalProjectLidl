// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  retries: 2,
  timeout: 180000, 
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
 // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.lidl.sk',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1920, height: 1080 }, 
    trace: 'on-first-retry',
  },

    projects: [
      { 
        name: 'setup',
        testMatch: './tests/auth.setup.*' 
      },
      {
        name: 'Main',
        use: {
          ...devices['Desktop Chrome'], 
          storageState: './.auth/user.json',
        },
        dependencies: ['setup'],
        testIgnore: /.*Login\.spec\.*/,  
      },
      {
        name: 'Auth',
        use: {
          ...devices['Desktop Chrome'],  
        },
        testMatch: /.*Login\.spec\.*/, 
      }
    ],

});

