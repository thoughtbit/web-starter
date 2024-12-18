import { useCallback, useMemo } from 'react';
import { useStoreApi } from './useStore';

export const useActions = () => {
  const store = useStoreApi();

  const addTodo = useCallback((todo: any) => {
    return store.getState().addTodo(todo);
  }, []);
  const getTodos = useCallback(() => {
    const { todos = [] } = store.getState();
    return todos.map((e) => ({ ...e }));
  }, []);

  const toggleTodo = useCallback((id: number) => {
    return store.getState().toggleTodo(id);
  }, []);

  const removeAllTodos = useCallback(() => {
    return store.getState().removeAllTodos();
  }, []);

  return useMemo(() => {
    return {
      addTodo,
      getTodos,
      toggleTodo,
      removeAllTodos,
    };
  }, [addTodo, getTodos, toggleTodo, removeAllTodos]);
};
