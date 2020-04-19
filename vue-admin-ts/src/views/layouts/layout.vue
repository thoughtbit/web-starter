<template>
  <div class="layout">
    <layout-header />
    <div class="layout-body">
      <aside class="sider-menu">
        <router-link class="nav-link" to="/dashboard">工作台</router-link>
      </aside>
      <aside class="sider-sub-menu">
        子菜单
      </aside>
      <main class="content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LayoutHeader from "./layout-header.vue";
  @Component({
    components: {
      LayoutHeader
    }
  })
  export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
  .layout {
    flex-direction: column;
    display: flex;
    height: 100vh;
    width: 100%;
    &-body {
      display: flex;
      height: calc(100vh - 64px);
      width: 100%;
      .sider-menu {
        width: 220px;
        background-color: #444;
      }
      .sider-sub-menu {
        width: 180px;
        background-color: #eee;
        border-right: 1px solid #ddd;
      }
      .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
      }
    }
  }

</style>
