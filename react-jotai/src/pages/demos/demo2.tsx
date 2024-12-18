import { isEqual } from 'lodash';
import { useStore } from 'zustand';
import { store, storeSelector } from '@/store';
import Form from './components/TodoForm';
import Todos from './components/Todos';

const Demo2 = () => {
  const state = useStore(store, (s) => s);
  const { isEmptyTodoList, displayListSelector } = useStore(store, storeSelector, isEqual);

  return (
    <div>
      <button onClick={state.removeAllTodos}>Clear all</button>
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

export default Demo2;
