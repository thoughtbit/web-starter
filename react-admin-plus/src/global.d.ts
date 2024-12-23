declare const __IS_DEVELOPMENT__: boolean;

declare module 'mockjs' {
  const mockjs: any;

  export default mockjs;
}

declare type Nullable<T> = T | null | undefined;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
declare type AnyObject = Record<string, any>;
declare type Dict<T = any> = Record<string, T>;
declare type Arrayable<T> = T | Array<T>
declare type Fn<T = void> = () => T
