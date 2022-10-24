import { isRef, reactive, unref } from '@mpxjs/core';
import type { MaybeRef } from '../types';

/**
 * Converts ref to reactive.
 * Converts ref to reactive. Also made possible to create a "swapable" reactive object.
 */
export function toReactive<T extends object>(objectRef: MaybeRef<T>): T {
  if (!isRef(objectRef)) return reactive(objectRef) as T;

  const proxy = new Proxy(
    {},
    {
      get(_, p, receiver) {
        return unref(Reflect.get(objectRef.value, p, receiver));
      },
      set(_, p, value) {
        if (isRef((objectRef.value as any)[p]) && !isRef(value)) (objectRef.value as any)[p].value = value;
        else (objectRef.value as any)[p] = value;
        return true;
      },
      deleteProperty(_, p) {
        return Reflect.deleteProperty(objectRef.value, p);
      },
      has(_, p) {
        return Reflect.has(objectRef.value, p);
      },
      ownKeys() {
        return Object.keys(objectRef.value);
      },
      getOwnPropertyDescriptor() {
        return {
          enumerable: true,
          configurable: true,
        };
      },
    }
  );

  return reactive(proxy) as T;
}

/*
const refState = ref({ foo: 'bar' })

console.log(refState.value.foo) // => 'bar'

const state = toReactive(refState) // <--

console.log(state.foo) // => 'bar'

refState.value = { bar: 'foo' }

console.log(state.foo) // => undefined
console.log(state.bar) // => 'foo'
*/
