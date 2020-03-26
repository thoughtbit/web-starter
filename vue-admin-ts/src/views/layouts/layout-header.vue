<template>
  <header class="layout-header">
    <router-link class="nav-link" to="/">首页</router-link>
    <router-link class="nav-link" to="/login">登录</router-link>
    <router-link class="nav-link" to="/about">关于</router-link>
  </header>
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
