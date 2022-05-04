// @ts-nocheck
import { readonly, ref } from "vue";

function useReducer(reducer, initialArg, init?) {
  const state = ref(init ? init(initialArg) : initialArg);

  const dispatch = (action) => {
    state.value = reducer(state.value, action);
  };

  return [readonly(state), dispatch];
}

export default useReducer;
