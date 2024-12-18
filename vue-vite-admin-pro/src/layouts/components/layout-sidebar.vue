<template>
  <Menu />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./menu/index.vue";

export default defineComponent({
  name: "LayoutSidebar",
  components: {
    Menu,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
