import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import cloudflare from '@astrojs/cloudflare'
import sentry from '@sentry/astro'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
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
    sentry({
      dsn: "https://d174fc3d55895a8efab55a1671c3a12b@o4507102601084928.ingest.de.sentry.io/4507102605475920",
      sourceMapsUploadOptions: {
        project: "frontend",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  devToolbar: {
    enabled: false,
  },
})
