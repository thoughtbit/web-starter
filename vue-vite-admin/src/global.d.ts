declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.vue";
declare module "lodash";
declare module "*.svg" {
  const CONTENT: string;
  export default CONTENT;
}
declare module "*.json" {
  const value: any;
  export default value;
}

declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_API_URL_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
