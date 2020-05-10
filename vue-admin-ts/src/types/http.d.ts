export type Method =
  | "get"
  | "GET"
  | "post"
  | "POST"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "download"
  | "DOWNLOAD"
  | "upload"
  | "UPLOAD";

export interface ResponseData {
  code: number;
  data?: any;
  message: string;
}

export interface APIConfig {
  server?: string;
  baseURL?: string;
  data?: object;
  headers?: object;
  token?: string;
}

export interface CoreOptions {
  url: string;
  params?: object;
  payload?: object;
  config?: APIConfig;
  noCache?: boolean;
}

export interface AuthorizationHeaders {
  "Content-Type": string;
  Authorization: string;
}

export interface Callback {
  (name: string): void;
}

export interface RestAPI {
  config: ExtendConfig;
  url: string;
  payload: object;
  callback? : Callback;
}

export interface ExtendConfig {
  token?: string;
  headers?: object;
  server?: string;
  data?: object;
}

export interface Get {
  config: APIConfig | ExtendConfig;
  url: string;
  params?: object;
  noCache?: number | boolean;
}

export interface EndpointOptions {
  [key: string]: {
    method: Method,
    endpoint: string
  }
}
