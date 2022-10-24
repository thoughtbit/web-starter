import { ref } from '@mpxjs/core';
import type { Ref } from '@mpxjs/core';

interface CreateAsyncProcessReturn<T extends (...args: any[]) => any> {
  active: Ref<boolean>;
  run: (...args: Parameters<T>) => Promise<ReturnType<T>>;
}

export function createAsyncProcess<T extends (...args: any[]) => any>(fn: T): CreateAsyncProcessReturn<T> {
  const active: CreateAsyncProcessReturn<T>['active'] = ref(false);

  const run: CreateAsyncProcessReturn<T>['run'] = async (...args) => {
    active.value = true;
    const result = await fn(...args);
    active.value = false;
    return result;
  };

  return { active, run };
}

/*
 const { active: loading, run: runFetchList } = createAsyncProcess(getUsers);
*/
