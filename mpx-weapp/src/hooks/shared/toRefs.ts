import type { ToRefs } from '@mpxjs/core';
import { toRefs as _toRefs, customRef, isRef } from '@mpxjs/core';
import type { MaybeRef } from '../types';

/**
 * Extended `toRefs` that also accepts refs of an object.
 *
 */
export function toRefs<T extends object>(objectRef: MaybeRef<T>): ToRefs<T> {
  if (!isRef(objectRef)) return _toRefs(objectRef);

  const result: any = Array.isArray(objectRef.value) ? new Array(objectRef.value.length) : {};

  for (const key in objectRef.value) {
    result[key] = customRef<T[typeof key]>(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        if (Array.isArray(objectRef.value)) {
          const copy: any = [...objectRef.value];
          copy[key] = v;
          objectRef.value = copy;
        } else {
          const newObject = { ...objectRef.value, [key]: v };

          Object.setPrototypeOf(newObject, objectRef.value);

          objectRef.value = newObject;
        }
      },
    }));
  }
  return result;
}

/*
const objRef = ref({ a: 'a', b: 0 })
const arrRef = ref(['a', 0])

const { a, b } = toRefs(objRef)
const [ a, b ] = toRefs(arrRef)

const obj = reactive({ a: 'a', b: 0 })
const arr = reactive(['a', 0])

const { a, b } = toRefs(obj)
const [ a, b ] = toRefs(arr)
*/
