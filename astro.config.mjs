import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://roboburger.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
