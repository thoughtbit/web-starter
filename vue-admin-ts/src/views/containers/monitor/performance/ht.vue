<template>
  <div class="page">请求追踪</div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class HttpTraceMonitor extends Vue {}
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
  }
</style>
