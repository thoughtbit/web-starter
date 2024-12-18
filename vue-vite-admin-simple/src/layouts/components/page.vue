<template>
  <main class="page" role="page" v-bind="$.attrs">
    <div class="container">
      <slot name="header" />
      <div v-if="$slots.header && $slots.default" class="page-body" role="main">
        <slot />
      </div>
      <slot v-else />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Page",
});
</script>

<style lang="scss" scoped>
.page {
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  &-body {
    position: relative;
    transition: background-color 0.3s;
  }
}
</style>
