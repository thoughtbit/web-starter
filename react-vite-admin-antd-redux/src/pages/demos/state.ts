import { createGlobalState } from "react-hooks-global-state";

export const { setGlobalState, useGlobalState } = createGlobalState({
  count: 0,
  user: {
    username: "",
    age: 0,
  },
});

export const countUp = () => {
  setGlobalState("count", (v) => v + 1);
};

export const countDown = () => {
  setGlobalState("count", (v) => v - 1);
};

export const setUserUsername = (username: string) => {
  setGlobalState("user", (v) => ({ ...v, username }));
};

export const setUserAge = (age: number) => {
  setGlobalState("user", (v) => ({ ...v, age }));
};
