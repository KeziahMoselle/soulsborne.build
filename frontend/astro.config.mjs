import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from "@astrojs/vue";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy:{
      enabled: true,
    }
  }),
  integrations: [
    vue(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});