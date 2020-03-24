<template>
  <div id="app">
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
  export default class extends Vue {}
</script>
