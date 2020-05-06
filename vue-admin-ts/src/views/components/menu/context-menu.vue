<template>
  <el-menu
    v-show="visible"
    :default-active="active"
    :style="style"
    class="contextmenu"
    @mouseleave="onMouseLeave"
    @select="onSelect"
  >
    <el-menu-item v-for="(item, index) in itemList" :key="index" :index="item.key">
      {{ item.text }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" src="@/views/components/menu/context-menu.ts"></script>

<style lang="scss" scoped>
  .contextmenu {
    position: fixed;
    z-index: 3;
    width: 110px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    .el-menu-item {
      padding-left: 0;
      height: 36px;
      line-height: 36px;
    }
  }
</style>
