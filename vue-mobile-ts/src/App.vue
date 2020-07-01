<template>
  <div id="app" class="app-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
<style lang="scss">
.app-container {
  height: 100vh !important;
}
</style>
