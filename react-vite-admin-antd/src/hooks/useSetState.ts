import { useState } from "react";

export function useSetState<T extends Record<string, any>>(initialState: T) {
  const [state, _setState] = useState(initialState);
  const setState = (statePartial: Partial<T> | ((currentState: T) => Partial<T>)) =>
    _setState((current) => ({
      ...current,
      ...(typeof statePartial === "function" ? statePartial(current) : statePartial),
    }));
  return [state, setState] as const;
}

/*
const [state, setState] = useSetState({ name: 'John', age: 35, job: 'Engineer' });

state; // -> { name: 'John', age: 35, job: 'Engineer' }

setState({ name: 'Jane' }); // -> { name: 'Jane', age: 35, job: 'Engineer' }
setState({ age: 25, job: 'Manager' }); // -> { name: 'Jane', age: 25, job: 'Manager' }
setState((current) => ({ age: current.age + 7 })); // -> { name: 'Jane', age: 32, job: 'Manager' }

useSetState([1, 2, 3]); // -> will not work
useSetState(1); // -> will not work
useSetState({ skills: ['JavaScript', 'TypeScript'] }); // -> works fine
*/