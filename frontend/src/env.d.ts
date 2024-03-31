/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PAYLOAD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}