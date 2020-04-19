<template>
  <div class="page">工作台页面</div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped>
  .page {
    height: 2000px;
  }
</style>
