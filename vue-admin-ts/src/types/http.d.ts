export interface APIConfig {
  server?: string;
  baseURL?: string;
  data?: object;
  headers?: object;
  token?: string ;
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
  "Authorization": string;
}

export interface RestAPI {
  config: ExtendConfig;
  url: string;
  payload: object;
}

export interface ExtendConfig {
  token?: string;
  headers?: object;
  server?: string;
  data?: object;
}

export  interface Get {
  config: APIConfig | ExtendConfig;
  url: string;
  params?: object;
  noCache?: number | boolean;
}
