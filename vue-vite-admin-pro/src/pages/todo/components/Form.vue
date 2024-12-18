<template>
  <input v-model="todoValue" type="text" placeholder="请输入......" />
  <button type="button" @click="addTodo">添加</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  emits: ["onAddTodo"],
  setup(props, { emit }) {
    const todoValue = ref("");

    const addTodo = () => {
      if (todoValue.value === "") {
        return;
      }
      emit("onAddTodo", {
        id: new Date().getTime(),
        content: todoValue.value,
        completed: false,
      });

      todoValue.value = "";
    };

    return {
      todoValue,
      addTodo,
    };
  },
});
</script>

<style lang="scss" scoped></style>
