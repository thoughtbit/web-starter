/* eslint-disable no-restricted-syntax */
import { reactive, toRefs } from "vue";

export function useReactive(initialState: any) {
  if (Object.prototype.toString.call(initialState) !== "[object Object]") {
    throw new TypeError(`The parameter 'action' must be the type 'Object'`);
  }

  const state = reactive(initialState);
  const stateRefs = toRefs(state);

  const setState = (key: any, value?: any) => {
    // eslint-disable-next-line no-prototype-builtins
    if (Object.prototype.toString.call(key) !== "[object Object]" && !initialState.hasOwnProperty(key)) {
      throw new ReferenceError(`Can't find the property ${key} from the Object`);
    }

    if (Object.prototype.toString.call(key) === "[object Object]") {
      for (const k in key) {
        // eslint-disable-next-line no-prototype-builtins
        if (initialState.hasOwnProperty(k)) {
          state[k] = key[k];
        } else {
          // eslint-disable-next-line no-lonely-if
          if (typeof value === "function") {
            state[key] = value(state[key]);
          } else {
            state[key] = value;
          }
        }
      }
    }
  };

  return {
    state,
    setState,
    stateRefs,
  };
}
