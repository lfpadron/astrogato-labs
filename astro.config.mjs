import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astrogatolabs.com.mx',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
