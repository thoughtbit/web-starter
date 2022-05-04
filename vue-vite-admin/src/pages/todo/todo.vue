<template>
  <TodoForm @on-add-todo="onAddTodo" />
  <TodoList :todoList="todoList" @on-toggle-todo="onToggleTodo" @on-remove-todo="onRemoveTodo" />
</template>

<script setup lang="ts">
import TodoForm from "./components/Form.vue";
import TodoList from "./components/List.vue";

import { actionTypes, todoReducer } from "./store";
import { useVueReducer } from "./hooks";

const initialState: any[] = [];

const [todoList, todoDispatch] = useVueReducer(todoReducer, initialState);
const onAddTodo = (todo: any) => {
  todoDispatch({
    type: actionTypes.ADD_TODO,
    payload: todo,
  });
};
const onToggleTodo = (id: any) => {
  todoDispatch({
    type: actionTypes.TOGGLE_TODO,
    payload: id,
  });
};

const onRemoveTodo = (id: any) => {
  todoDispatch({
    type: actionTypes.REMOVE_TODO,
    payload: id,
  });
};
</script>
