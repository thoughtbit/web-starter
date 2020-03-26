<template>
  <header class="layout-footer">底部</header>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class LayoutFooter extends Vue {}
</script>

<style lang="scss" scoped>
  .layout-footer {
    background-color: #fff;
  }
</style>
