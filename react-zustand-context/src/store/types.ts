// counter
export type CounterStore = {
  count: number;
};
export type CounterActions = {
  increment: () => void;
  decrement: () => void;
  resetCount: () => void;
};
export type CounterState = CounterStore & CounterActions;

// todos
export type TodosStore = {
  todos: { id: number; title: string; completed?: boolean }[];
};
export type TodosActions = {
  addTodo: (todo: any) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  removeAllTodos: () => void;
};
export type TodosState = TodosStore & TodosActions;

// auth
export type AuthStore = {
  userInfo: any;
  token: string | null;
  isAuthenticated: boolean;
  authorities: string[];
};
export type AuthActions = {
  login: (params: any) => void;
  logout: () => void;
};
export type AuthState = AuthStore & AuthActions;

// global
export type GlobalsStore = {
  darkMode: boolean;
};
export type GlobalsActions = {
  toggleDarkMode: () => void;
  reset: () => void;
};
export type GlobalsState = GlobalsStore & GlobalsActions;

// all
export type StoreState = CounterState & TodosState & AuthState & GlobalsState;

// slice selector
type ExtractState<S> = S extends { getState: () => infer T } ? T : never;
export type SliceSelector<T, U> = (state: ExtractState<T>) => U;
