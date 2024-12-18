import { flattenArrayable } from './array';

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function sum(...args: number[] | number[][]) {
  return flattenArrayable(args).reduce((a: any, b: any) => a + b, 0);
}
