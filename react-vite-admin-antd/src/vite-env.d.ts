/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_API_URL_PREFIX: string;
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv;
  env: {
    MODE: "mock" | "development" | "production" | "staging" | "test";
  };
}
  