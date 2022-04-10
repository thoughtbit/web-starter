/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BASE_URL_PREFIX: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_DROP_CONSOLE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}