import { useReducer, useMemo, useRef } from 'react';
import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from './types';

export interface ListActions<T> {
  /**
   * @description Set new list instead old one
   */
  set: (newList: IHookStateSetAction<T[]>) => void;
  /**
   * @description Add item(s) at the end of list
   */
  push: (...items: T[]) => void;

  /**
   * @description Replace item at given position. If item at given position not exists it will be set.
   */
  updateAt: (index: number, item: T) => void;
  /**
   * @description Insert item at given position, all items to the right will be shifted.
   */
  insertAt: (index: number, item: T) => void;

  /**
   * @description Replace all items that matches predicate with given one.
   */
  update: (predicate: (a: T, b: T) => boolean, newItem: T) => void;
  /**
   * @description Replace first item matching predicate with given one.
   */
  updateFirst: (predicate: (a: T, b: T) => boolean, newItem: T) => void;
  /**
   * @description Like `updateFirst` bit in case of predicate miss - pushes item to the list
   */
  upsert: (predicate: (a: T, b: T) => boolean, newItem: T) => void;

  /**
   * @description Sort list with given sorting function
   */
  sort: (compareFn?: (a: T, b: T) => number) => void;
  /**
   * @description Same as native Array's method
   */
  filter: (callbackFn: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any) => void;

  /**
   * @description Removes item at given position. All items to the right from removed will be shifted.
   */
  removeAt: (index: number) => void;
  /**
   * @deprecated Use removeAt method instead
   */
  remove: (index: number) => void;

  /**
   * @description Make the list empty
   */
  clear: () => void;
  /**
   * @description Reset list to initial value
   */
  reset: () => void;
}

const updateReducer = (num: number): number => (num + 1) % 1_000_000;
function useUpdate(): () => void {
  const [, update] = useReducer(updateReducer, 0);
  return update;
}

function useList<T>(initialList: IHookStateInitAction<T[]> = []): [T[], ListActions<T>] {
  const list = useRef(resolveHookState(initialList));
  const update = useUpdate();

  const actions = useMemo<ListActions<T>>(() => {
    const a = {
      set: (newList: IHookStateSetAction<T[]>) => {
        list.current = resolveHookState(newList, list.current);
        update();
      },

      push: (...items: T[]) => {
        items.length && actions.set((curr: T[]) => curr.concat(items));
      },

      updateAt: (index: number, item: T) => {
        actions.set((curr: T[]) => {
          const arr = curr.slice();

          arr[index] = item;

          return arr;
        });
      },

      insertAt: (index: number, item: T) => {
        actions.set((curr: T[]) => {
          const arr = curr.slice();

          index > arr.length ? (arr[index] = item) : arr.splice(index, 0, item);

          return arr;
        });
      },

      update: (predicate: (a: T, b: T) => boolean, newItem: T) => {
        actions.set((curr: T[]) => curr.map((item) => (predicate(item, newItem) ? newItem : item)));
      },

      updateFirst: (predicate: (a: T, b: T) => boolean, newItem: T) => {
        const index = list.current.findIndex((item) => predicate(item, newItem));

        index >= 0 && actions.updateAt(index, newItem);
      },

      upsert: (predicate: (a: T, b: T) => boolean, newItem: T) => {
        const index = list.current.findIndex((item) => predicate(item, newItem));

        index >= 0 ? actions.updateAt(index, newItem) : actions.push(newItem);
      },

      sort: (compareFn?: (a: T, b: T) => number) => {
        actions.set((curr: T[]) => curr.slice().sort(compareFn));
      },

      filter: <S extends T>(
        callbackFn: (value: T, index: number, array: T[]) => value is S,
        thisArg?: any
      ) => {
        actions.set((curr: T[]) => curr.slice().filter(callbackFn, thisArg));
      },

      removeAt: (index: number) => {
        actions.set((curr: T[]) => {
          const arr = curr.slice();

          arr.splice(index, 1);

          return arr;
        });
      },

      clear: () => {
        actions.set([]);
      },

      reset: () => {
        actions.set(resolveHookState(initialList).slice());
      },
    };

    /**
     * @deprecated Use removeAt method instead
     */
    (a as ListActions<T>).remove = a.removeAt;

    return a as ListActions<T>;
  }, []);

  return [list.current, actions];
}

export default useList;

/*
// 语法
const [list, { 
    set, 
    push, 
    updateAt, 
    insertAt, 
    update, 
    updateFirst,
    upsert, 
    sort, 
    filter, 
    removeAt, 
    remove, 
    clear, 
    reset 
}] = useList(array: any[] | ()=> any[]);

list: T{} — current list;
set: (list: T[]) => void; — Set new list instead old one;
push: (...items: T[]) => void; — Add item(s) at the end of list;
updateAt: (index: number, item: T) => void; — Replace item at given position. If item at given position not exists it will be set;
insertAt: (index: number, item: T) => void; — Insert item at given position, all items to the right will be shifted;
update: (predicate: (a: T, b: T) => boolean, newItem: T) => void; — Replace all items that matches predicate with given one;
updateFirst: (predicate: (a: T, b: T) => boolean, newItem: T) => void; — Replace first item matching predicate with given one;
upsert: (predicate: (a: T, b: T) => boolean, newItem: T) => void; — Like updateFirst but in case of predicate miss - pushes item to the list;
sort: (compareFn?: (a: T, b: T) => number) => void; — Sort list with given sorting function;
filter: (callbackFn: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any) => void; — Same as native Array's method;
removeAt: (index: number) => void; — Removes item at given position. All items to the right from removed will be shifted;
remove: (index: number) => void; — DEPRECATED: Use removeAt method instead;
clear: () => void; — Make the list empty;
reset: () => void; — Reset list to initial value;

// 使用
const Demo = () => {
  const [list, { set, push, updateAt, insertAt, update, updateFirst, upsert, sort, filter, removeAt, clear, reset }] = useList([1, 2, 3, 4, 5]);

  return (
    <div>
      <button onClick={() => set([1, 2, 3])}>Set to [1, 2, 3]</button>
      <button onClick={() => push(Date.now())}>Push timestamp</button>
      <button onClick={() => updateAt(1, Date.now())}>Update value at index 1</button>
      <button onClick={() => remove(1)}>Remove element at index 1</button>
      <button onClick={() => filter(item => item % 2 === 0)}>Filter even values</button>
      <button onClick={() => sort((a, b) => a - b)}>Sort ascending</button>
      <button onClick={() => sort((a, b) => b - a)}>Sort descending</button>
      <button onClick={clear}>Clear</button>
      <button onClick={reset}>Reset</button>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};
*/