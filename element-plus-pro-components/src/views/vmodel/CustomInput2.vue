<template>
  <div class="ui-input-wrapper">
    <input type="text" :value="ipt" @input="onInput" class="ui-input" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    ipt: {
      type: String,
      default: "",
    },
  },
  emits: ["update:ipt"],
  setup(props, { emit }) {
    const onInput = (event: InputEvent) => {
      const inputElement = event.target as HTMLInputElement;
      console.log("onInput:", event, inputElement, inputElement.value);

      emit("update:ipt", inputElement.value);
    }

    return {
      onInput
    }
  }
});

</script>

<style scoped lang="scss">
.ui-input {
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.85);
  padding-left: 10px;
  display: inline-block;
  border: none;
  width: 100%;
}
</style>