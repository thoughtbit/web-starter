<template>
  <app-header title="NeiApp" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";

export default defineComponent({
  name: "PageView",
  components: {
    AppHeader,
  },
  setup() {
    return {};
  },
});
</script>
