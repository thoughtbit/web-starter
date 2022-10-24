import { useState } from './use-state';

export function useReducer(reducer: Function, initialArg: any, init?: any) {
  const [state, setState] = useState(init ? init(initialArg) : initialArg);

  const dispatch = (action: any) => {
    if (Object.prototype.toString.call(action) !== '[object Object]') {
      throw new Error(`The parameter 'action' must be the type 'Object'`);
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!action.hasOwnProperty('type')) {
      throw new Error(`The parameter 'action' need a property 'type'`);
    }
    reducer(state, setState, action);
  };

  return [state, dispatch];
}

/*
```js
function countReducer(state, setState, action) {
  const { type } = action;

  switch (type) {
    case 'PLUS':
      setState(state.value + 1);
      break;
    case 'MINUS':
      setState(state.value - 1);
      break;
    default:
      break;
  }
}
const [count countDispatch] = useReducer(countReducer, 10);
```

```html
<p>{{count}}</p>
<button @click="countDispatch({ type: 'PLUS' })">+</button>
<button @click="countDispatch({ type: 'MINUS' })">-</button>
```
*/
