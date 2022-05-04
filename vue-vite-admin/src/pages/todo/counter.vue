<template>
  <div>
    Count: {{ state.count }}
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from "vue";
import { useReducer } from "./hooks";

const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Wrong action type!");
  }
}

export default defineComponent({
  setup() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const increment = () => {
      dispatch({ type: "increment" });
    };

    const decrement = () => {
      dispatch({ type: "decrement" });
    };

    return {
      dispatch,
      state,
      increment,
      decrement,
    };
  },
});
</script>

<style lang="scss" scoped></style>
