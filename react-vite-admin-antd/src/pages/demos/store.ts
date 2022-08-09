import { createStore } from "react-hooks-global-state";

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "setUsername"; username: string }
  | { type: "setAge"; age: number };

export const { dispatch, useStoreState } = createStore(
  (state, action: Action) => {
    switch (action.type) {
      case "increment":
        return {
          ...state,
          count: state.count + 1,
        };
      case "decrement":
        return {
          ...state,
          count: state.count - 1,
        };
      case "setUsername":
        return {
          ...state,
          user: {
            ...state.user,
            username: action.username,
          },
        };
      case "setAge":
        return {
          ...state,
          user: {
            ...state.user,
            age: action.age,
          },
        };
      default:
        return state;
    }
  },
  {
    count: 0,
    user: {
      age: 0,
      username: "",
    },
  }
);
