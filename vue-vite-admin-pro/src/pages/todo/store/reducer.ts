// @ts-nocheck
import actionTypes from "./actionTypes";
import { addTodo, toggleTodo, removeTodo } from "./actions";

function todoReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_TODO:
      addTodo(state, payload);
      break;
    case actionTypes.TOGGLE_TODO:
      toggleTodo(state, payload);
      break;
    case actionTypes.REMOVE_TODO:
      removeTodo(state, payload);
      break;
    default:
      break;
  }
}

export { todoReducer };
