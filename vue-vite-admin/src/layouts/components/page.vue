<template>
  <div class="page" role="page" v-bind="$.attrs">
    <slot name="header" />
    <main v-if="$slots.header && $slots.default" class="page-body" role="main">
      <slot />
    </main>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Page",
  props: {
    top: {
      type: String,
      default: "var(--g-topbar-height)",
    },
    padding: {
      type: String,
      default: "var(--g-page-padding)",
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  overflow: hidden;
  &-body {
    position: relative;
    overflow: hidden;
    overflow-y: auto;
    padding: v-bind(padding);
    margin-top: v-bind(top);
    height: calc(100% - v-bind(top));
    background-color: #f8f8f8;
    transition: background-color 0.3s;
  }
}
</style>
