<template>
  <div class="page">控制台页面</div>
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
