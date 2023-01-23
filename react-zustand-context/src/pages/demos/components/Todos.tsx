import { useCallback } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useStore } from 'zustand';
import { store } from '@/store';

const Todos = () => {
  const [parent, enableAnimations] = useAutoAnimate<any>(/* optional config */);
  const todos = useStore(store, useCallback((state) => state.todos, []));
  const removeTodo = useStore(store, (state) => state.removeTodo);
  const toggleTodo = useStore(store, useCallback((state) => state.toggleTodo, []));

  return (
    <>
      <h2>Todos</h2>
      <p>{todos.length} todos in the list</p>
      <ul ref={parent}>
        {todos.map((todo) => (
          <li key={`todo_item_${todo.id}`}>
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              onClick={() => {
                toggleTodo(todo.id);
              }}
            />

            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>

            <button onClick={() => removeTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
