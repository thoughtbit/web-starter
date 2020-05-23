<template>
  <div id="app" class="app-container" :class="{wide: $responsive.wide}">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MetaInfoApp } from "@/config/metaInfo.config";

  @Component({
    name: "App",
    metaInfo: MetaInfoApp
  })
  export default class App extends Vue {}
</script>
<style lang="scss">
  .app-container {
    margin: 0 auto;
    min-width: 1200px;
    height: 100vh !important;
  }
</style>
