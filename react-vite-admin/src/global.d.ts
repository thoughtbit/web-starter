declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module 'faker';
declare module '@loadable/component';

declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
