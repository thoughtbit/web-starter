import { useState } from "react";

export function useQueue<T>({ initialValues = [], limit }: { initialValues?: T[]; limit: number }) {
  const [{ state, queue }, setState] = useState({
    state: initialValues.slice(0, limit),
    queue: initialValues.slice(limit),
  });

  const add = (...items: T[]) =>
    setState((current) => {
      const results = [...current.state, ...current.queue, ...items];

      return {
        state: results.slice(0, limit),
        queue: results.slice(limit),
      };
    });

  const update = (fn: (state: T[]) => T[]) =>
    setState((current) => {
      const results = fn([...current.state, ...current.queue]);

      return {
        state: results.slice(0, limit),
        queue: results.slice(limit),
      };
    });

  const cleanQueue = () => setState((current) => ({ state: current.state, queue: [] }));

  return {
    state,
    queue,
    add,
    update,
    cleanQueue,
  };
}

export default useQueue;

/*
import { useQueue } from '@/hooks';

const { state, queue, add, update, cleanQueue } = useQueue({
  initialValues: [1],
  limit: 2,
});

// state -> [1], queue -> []

// When state.length is less that limit, new items are added to state
add(2);
// state -> [1,2], queue -> []

// When state.length is equal to limit, new items are added to queue
add(3, 4, 5, 6);
// state -> [1,2], queue -> [3,4,5,6]

// Use update function to modify items
update((values) => values.map((item) => item * 3));
// state -> [3,6], queue -> [9,12,15,18]

// If you add or remove items in update function,
// they will be divided between queue and state according to limit
// order is always preserved
update((values) => values.filter((item) => item % 2));
// state -> [3,9], queue -> [15]

// Remove all items from queue
cleanQueue();
// state -> [3,9], queue -> []

// Remove all items from queue and state
update(() => []);
// state -> [], queue -> []
*/
