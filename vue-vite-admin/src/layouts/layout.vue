<template>
  <page-layout>
    <page-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageLayout from "./components/page-layout.vue";
import PageView from "./components/page-view.vue";

export default defineComponent({
  name: "Layout",
  components: {
    PageLayout,
    PageView,
  },
});
</script>
