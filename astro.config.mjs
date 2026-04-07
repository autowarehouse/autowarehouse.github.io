import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://autowarehouse.github.io',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
