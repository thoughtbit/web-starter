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
    <layout-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LayoutHeader from "./layout-header.vue";
  import LayoutFooter from "./layout-footer.vue";
  @Component({
    components: {
      LayoutHeader,
      LayoutFooter
    }
  })
  export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
  .layout-body {
    display: flex;
    background-color: #f5f5f5;
  }
  .sider-menu {
    width: 280px;
  }
  .sider-sub-menu {
    width: 180px;
  }
  .content {
    flex: 1;
  }
</style>
