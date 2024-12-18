import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useStore, useStoreApi } from '@/store';
import type { StoreState } from '@/store/types';

type StoreUpdaterProps = StoreState & {
  isEmptyTodoList: () => void;
  todo?: any;
  todoId?: number;
};

const selector = (s: StoreState) => ({
  addTodo: s.addTodo,
  removeTodo: s.removeTodo,
});

function useStoreUpdater<T>(value: T | undefined, setStoreState: (param: T) => void) {
  useEffect(() => {
    if (typeof value !== 'undefined') {
      setStoreState(value);
    }
  }, [value]);
}

// updates with values in store that don't have a dedicated setter function
function useDirectStoreUpdater(key: keyof StoreState, value: any, deps = [value]) {
  const store = useStoreApi();
  useEffect(() => {
    if (typeof value !== 'undefined') {
      store.setState({ [key]: value });
    }
  }, deps);
}

const StoreUpdater = ({ todo, todoId, isEmptyTodoList }: StoreUpdaterProps) => {
  const { addTodo, removeTodo } = useStore(selector, shallow);

  useDirectStoreUpdater('toggleTodo', isEmptyTodoList, []);

  useStoreUpdater<Record<string, any>>(todo, addTodo);
  useStoreUpdater<number>(todoId, removeTodo);

  return null;
};

export default StoreUpdater;

/*
// 使用
<StoreUpdater
	todo={todo}
	todoId={edges}
	isEmptyTodoList= {isEmptyTodoList}
/>
*/
