import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.js',
  use: {
    baseURL: 'http://localhost:5000',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  }
});
