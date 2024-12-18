# useReactive

```js
const [state, setState, stateRefs] = useReactive({
  name: "moocss",
  age: 18
});
setState('name', 'kami');
setState('age', 35);
setState('age', age => 35);
setState({
  name: "liming",
  age: 48
});

state.age = 28

```
