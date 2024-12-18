// @ts-nocheck

function addTodo(state, payload) {
  state.value.push(payload);
}

function toggleTodo(state, payload) {
  state.value = state.value.map((item) => {
    if (item.id === payload) {
      item.completed = !item.completed;
    }
    return item;
  });
}

function removeTodo(state, payload) {
  state.value = state.value.filter((item) => item.id !== payload);
}

export { addTodo, toggleTodo, removeTodo };
