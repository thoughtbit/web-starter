import { useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import type { StoreState } from '@/store/types';
import Form from './components/Form';
import Todos from './components/Todos';
import { useStore } from '@/store';

const selector = (s: StoreState) => ({
  isEmptyTodoList: s.todos.length === 0,
  displayListSelector: s.todos.filter((item) => item.completed),
  removeAllTodos: s.removeAllTodos,
});

const Demo = () => {
  const { removeAllTodos, isEmptyTodoList, displayListSelector } = useStore(selector, shallow);

  const remove = useStore(useCallback((s: StoreState) => s.removeAllTodos, []));

  return (
    <div>
      <button onClick={removeAllTodos}>Clear all</button>
      <button onClick={remove}>Clear all</button>
      <Form />
      <Todos />

      {JSON.stringify(isEmptyTodoList)}
      <ul>
        {displayListSelector.map((item: any, index) => (
          <li key={item.id}>
            {item.id}-{item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demo;
