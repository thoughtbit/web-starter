<template>
  <header class="page-header">
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageHeader",
});
</script>

<style lang="scss" scoped>
.page-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: var(--g-topbar-height);
  padding: 0 20px;
  background-color: #edf5f9;
}
</style>
