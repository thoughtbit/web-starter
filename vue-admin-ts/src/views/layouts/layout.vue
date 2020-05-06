<template>
  <div class="layout">
    <layout-header />
    <div class="layout-body">
      <sider-menu :menuData="menuData" :activeMenu="activeMenu" @menuSelect="onMenuSelect" />
      <sider-sub-menu :menuData="menuData" :collapsed="collapsed" :menuPath="activeMenu" :menuTitle="menuTitle" />
      <main class="content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script lang="ts" src="@/views/layouts/layout.ts"></script>

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
      .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
      }
    }
  }
</style>
