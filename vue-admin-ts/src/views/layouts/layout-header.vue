<template>
  <footer class="layout-header">头部</footer>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class LayoutHeader extends Vue {}
</script>

<style lang="scss" scoped>
  .layout-header {
    background-color: #fff;
  }
</style>
