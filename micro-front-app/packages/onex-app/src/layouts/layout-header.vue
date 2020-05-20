<template>
  <div class="ui-layout-header">
    <h1 class="header-logo">
      <router-link class="logo" to="/">九色鹿数字云</router-link>
    </h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LayoutHeader extends Vue {}
</script>

<style lang="scss" scoped>
.ui-layout-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: #262f3e;
}
.header-logo {
  width: 220px;
  padding: 0 10px 0 15px;
  .logo {
    font-size: 24px;
    color: #fff;
  }
}
</style>
