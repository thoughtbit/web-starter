// @ts-nocheck
import { useState } from 'react';

export function useArray(initialValue = []) {
  const [array, setArray] = useState(initialValue);

  function push(element) {
    setArray((a) => [...a, element]);
  }

  function replace(index, newElement) {
    setArray((a) => {
      return [...a.slice(0, index), newElement, ...a.slice(index + 1)];
    });
  }

  function filter(callback) {
    setArray((a) => {
      return a.filter(callback);
    });
  }

  function remove(index) {
    setArray((a) => {
      return [...a.slice(0, index), ...a.slice(index + 1)];
    });
  }

  function clear() {
    setArray([]);
  }

  function reset() {
    setArray(initialValue);
  }

  return { array, set: setArray, push, replace, filter, remove, clear, reset };
}

/*
const INITIAL_ARRAY = [1, 2, 3]
// const INITIAL_ARRAY = () => [1, 2, 3]

function App() {
  const { array, set, push, replace, filter, remove, clear, reset } =
    useArray(INITIAL_ARRAY)

  return (
    <>
      <div>{array.join(", ")}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          alignItems: "flex-start",
          marginTop: "1rem",
        }}
      >
        <button onClick={() => set([4, 5, 6])}>Set to [4, 5, 6]</button>
        <button onClick={() => push(4)}>Push 4</button>
        <button onClick={() => replace(1, 9)}>
          Replace the second element with 9
        </button>
        <button onClick={() => filter(n => n < 3)}>
          Keep numbers less than 3
        </button>
        <button onClick={() => remove(1)}>Remove second element</button>
        <button onClick={clear}>Clear</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  )
}
*/