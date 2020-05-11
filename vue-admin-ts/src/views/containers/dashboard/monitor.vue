<template>
  <div class="page">监控页面</div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class Monitor extends Vue {}
</script>

<style lang="scss" scoped>
  .page {
    height: 2000px;
  }
</style>
