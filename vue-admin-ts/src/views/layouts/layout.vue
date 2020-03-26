<template>
  <div class="layout">
    <layout-footer />
    <div class="layout-body">
      <aside class="sider-menu">
        主菜单
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
  .layout {
    background-color: #f5f5f5;
  }
</style>
