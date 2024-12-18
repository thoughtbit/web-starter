// @ts-nocheck
import { useState } from "../use-state";

export function useReducer(reducer, initialArg, init?) {
  const [state, setState] = useState(init ? init(initialArg) : initialArg);

  const dispatch = (action: any) => {
    if (Object.prototype.toString.call(action) !== "[object Object]") {
      throw new TypeError(`The parameter 'action' must be the type 'Object'`);
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!action.hasOwnProperty("type")) {
      throw new ReferenceError(`The parameter 'action' need a property 'type'`);
    }
    reducer(state, setState, action);
  };

  return [state, dispatch];
}
