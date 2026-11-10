import { defineConfig } from '@playwright/test';
import config from './playwright.config';

export default defineConfig({
  ...config,
  testIgnore: [],
  webServer: undefined,
  use: { ...config.use, baseURL: process.env.CONTAINER_URL ?? 'http://127.0.0.1:8080' },
});
