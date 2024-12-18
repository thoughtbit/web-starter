# useReducer

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
