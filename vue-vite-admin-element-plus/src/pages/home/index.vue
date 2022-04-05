<template>
  <div class="mod container text-center mx-auto p-20">
    <img alt="Vue logo" class="element-plus-logo" src="@/assets/images/logo.png" />
    <ElementHelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.mod {
  :deep(.el-button) {
    border: 2px solid #fa233b;
  }

  :global(.el-input__inner) {
    border: 1px solid #fa233b;
  }
}
</style>
