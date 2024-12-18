// @ts-nocheck
import { ref } from "vue";

function useReducer(reducer, initialArg, init?) {
  const state = ref(init ? init(initialArg) : initialArg);

  const dispatch = (action) => {
    reducer(state, action);
  };

  return [state, dispatch];
}

export default useReducer;
