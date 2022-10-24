import { ref } from '@mpxjs/core';
import type { Ref, UnwrapRef } from '@mpxjs/core';

export type SetStateAction<S> = S | ((prevState: S) => S);

export type Dispatch<T> = (val: SetStateAction<T>) => void;

export const useState = <T>(initial?: T) => {
  const state = ref<T | undefined>(initial);
  const dispatch = (next: SetStateAction<T>) => {
    const draft = typeof next === 'function' ? (next as (prevState: T) => T)(state.value as T) : next;
    state.value = draft as UnwrapRef<T>;
  };
  return [state, dispatch] as [Ref<T>, Dispatch<T>];
};

/*
  const [visible, setVisible] = useState(false)
  const clickHandler = () => setVisible(true)
*/
