import { isEqual } from 'lodash';
import { useZustand } from '@/utils/zustand';
import { store, storeSelector } from '@/store';
import Form from './components/TodoForm';
import Todos from './components/Todos';

const Demo2 = () => {
  const state = useZustand(store, (s) => s);
  // 深比较
  const { isEmptyTodoList, displayListSelector } = useZustand(store, storeSelector, isEqual);

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
