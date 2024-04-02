/// <reference types="astro/client" />

import type { User } from "~/payload-types";

interface ImportMetaEnv {
  readonly PUBLIC_PAYLOAD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
      user: User,
  }
}