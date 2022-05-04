<template>
  <header class="text-center py-10">头部</header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageView",
  components: {},
  setup() {
    return {};
  },
});
</script>
