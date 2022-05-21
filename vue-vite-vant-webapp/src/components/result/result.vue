<template>
  <main class="result" role="main">
     <slot></slot>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue"

export default defineComponent({
  name: "result",
});
</script>
<style lang="scss" scoped>
.result {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
