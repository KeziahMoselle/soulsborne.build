import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import cloudflare from '@astrojs/cloudflare'
import purgecss from 'astro-purgecss'

// https://astro.build/config
export default defineConfig({
  output: 'server',
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
    purgecss(),
  ],
  devToolbar: {
    enabled: false,
  },
})
