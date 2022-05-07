<template>
  <div ref="modalRef" class="modal">
    <p>登录 {{ username }}, {{ modelValue }}</p>
    <p><button type="button" class="close-btn" @click="onClose">关闭</button></p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { onClickOutside } from "@vueuse/core";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const modalRef = ref(null);

    const username = ref("kami");

    const onClose = () => {
      emit("update:modelValue", false);
    };

    onClickOutside(modalRef, (event) => {
      console.log(event);
      emit("update:modelValue", false);
    });

    return {
      username,
      onClose,
      modalRef,
    };
  },
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  background-color: #fff;
  color: #000;
  .close-btn {
  }
}
</style>
