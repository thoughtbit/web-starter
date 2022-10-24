import { ref } from '@mpxjs/core';

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const count = ref(initialValue);

  const { max = Infinity, min = -Infinity } = options;

  const inc = (delta = 1) => (count.value = Math.min(max, count.value + delta));
  const dec = (delta = 1) => (count.value = Math.max(min, count.value - delta));
  const get = () => count.value;
  const set = (val: number) => (count.value = val);
  const reset = (val = initialValue) => {
    initialValue = val;
    return set(val);
  };

  return { count, inc, dec, get, set, reset };
}

/*
const { count, inc, dec, set, reset } = useCounter()
*/
