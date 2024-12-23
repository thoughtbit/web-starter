import type { StateCreator } from 'zustand';
import type { StoreState, TodosStore, TodosState } from '../types';

const initialState: TodosStore = {
  todos: [
    {
      id: Math.floor(Math.random() * 100) + 1,
      title: 'Go to the gym',
      completed: false,
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      title: 'Buy coffee',
      completed: false,
    },
  ],
};

export const createTodosSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown], ["zustand/immer", never]],
  [],
  TodosState
> = (set) => ({
  ...initialState,
  addTodo: (todo: any) => set((state) => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    })),

  removeTodo: (id: number) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  removeAllTodos: () => set({ todos: [] }),
});
