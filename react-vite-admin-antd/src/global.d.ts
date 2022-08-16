declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.css";
declare module "lodash";

declare module '*.scss' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module "*.svg" {
  export default src as string;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "@loadable/component";

declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
