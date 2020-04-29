declare module 'qs';
declare module 'json-server';
declare module 'http-proxy-middleware';
declare module 'lowdb';
declare module 'bcrypt';

declare namespace express {
  export interface Request {}
  export interface Response {}
  export interface NextFunction {}
}

declare module 'express' {
  let express: any;
  export = express;
}

declare var __filename: string;
declare var __dirname: string;
