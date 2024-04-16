/// <reference types="astro/client" />
type Runtime = import('@astrojs/cloudflare').Runtime<Env>

interface ImportMetaEnv {
  readonly PUBLIC_PAYLOAD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals extends Runtime {
    user: import('@payload-types').User
  }
}

interface Umami {
  track: (event: string, data?: any) => void
}

declare global {
  interface Window {
    umami: Umami
  }
}
