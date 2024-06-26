import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    vue({
      appEntrypoint: '/src/pages/_app',
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  devToolbar: {
    enabled: false,
  },
})
