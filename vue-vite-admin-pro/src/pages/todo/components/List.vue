<template>
  <ul>
    <li v-for="item of todoList" :key="item.id">
      <input type="checkbox" :checkbox="item.completed" @click="toggleTodo(item.id)" />

      <span :style="{ textDecoration: item.completed ? 'line-through' : 'none' }">{{ item.content }}</span>

      <button type="button" @click="removeTodo(item.id)">删除</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoList",
  props: {
    todoList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["onToggleTodo", "onRemoveTodo"],
  setup(props, { emit }) {
    const toggleTodo = (id: any) => {
      emit("onToggleTodo", id);
    };

    const removeTodo = (id: any) => {
      emit("onRemoveTodo", id);
    };

    return {
      toggleTodo,
      removeTodo,
    };
  },
});
</script>

<style lang="scss" scoped></style>
