/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PAYLOAD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
      user: import('~/payload-types').User,
  }
}