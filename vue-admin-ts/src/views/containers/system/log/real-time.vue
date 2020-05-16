<template>
  <div class="page">实时日志</div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class LogRealTime extends Vue {}
</script>

<style lang="scss" scoped>
  .page {
    height: 2000px;
  }
</style>
