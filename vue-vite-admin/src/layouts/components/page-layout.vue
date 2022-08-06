<template>
  <!-- 最大布局容器 -->
  <el-container class="ui-layout">
    <!-- 头部布局 -->
    <el-header class="ui-layout-header">
      <layout-header />
    </el-header>
    <el-container class="ui-layout-body">
      <!-- 侧栏布局 -->
      <el-aside class="ui-layout-aside">
        <layout-sidebar />
      </el-aside>
      <!-- 主体布局 -->
      <el-main class="ui-layout-content">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutSidebar from "./layout-sidebar.vue";
import LayoutHeader from "./layout-header.vue";

export default defineComponent({
  name: "PageLayout",
  components: {
    LayoutSidebar,
    LayoutHeader,
  },
});
</script>

<style lang="scss" scoped>
.ui-layout {
  flex-direction: column;
  height: 100%;
  width: 100%;
  &-header {
    height: var(--g-header-height);
    background-color: #2e8bcb;
    background: linear-gradient(270deg, #00cc8c 0%, #2e8bcb 100%);
  }
  &-body {
    height: calc(100vh - var(--g-header-height));
  }
  &-aside {
    position: fixed;
    top: calc(var(--g-header-height));
    bottom: 0;
    left: 0;
    width: var(--g-main-sidebar-width);
    background-color: #195673;
    z-index: 1001;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
  &-content {
    position: relative;
    overflow: hidden;
    height: 100%;
    margin-left: calc(var(--g-main-sidebar-width));
    padding: 0;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
}
</style>
