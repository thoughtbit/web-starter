export const isArray = Array.isArray;
export const isArrayNonEmpty = <T>(arg: unknown): arg is T[] => isArray(arg) && arg.length > 0;
export const isObject = (value: unknown): value is Record<any, any> => value !== null && typeof value === 'object';
export const isFunction = (value: unknown): value is Function => typeof value === 'function';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined';
export const isUndefined = (value: unknown): value is undefined | void => value === undefined;
export const isObjectLike = (value: unknown): value is any => !!value && typeof value === 'object';
export const isPromise = <T>(value: unknown): value is Promise<T> => isObjectLike(value) && isFunction(value.then);

export const isNull = (value: any): value is null => toString(value) === '[object Null]'
export const isRegExp = (value: any): value is RegExp => toString(value) === '[object RegExp]'
export const isDate = (value: any): value is Date => toString(value) === '[object Date]'
export const isWindow = (value: any): boolean => typeof window !== 'undefined' && toString(value) === '[object Window]'
export const isBrowser = typeof window !== 'undefined'