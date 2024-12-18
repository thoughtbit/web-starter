<template>
  <div class="panel">
    <div v-if="$slots.header || header" class="panel-header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ui-panel",
  props: {
    header: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.panel {
  background-color: #fff;
  &-header {
    padding: 20px;
  }
  &-body {
    padding: 0 20px 20px;
  }
}
</style>
