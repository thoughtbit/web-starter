<template>
  <el-dropdown>
    <a href="javascript:;" class="el-dropdown-link">
      语言
      <i class="el-icon-arrow-down el-icon--right" />
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>中文</el-dropdown-item>
      <el-dropdown-item>English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class TopLang extends Vue {

  }
</script>

<style lang="scss" scoped>
  .dropdown-link {
    display: block;
    height: 60px;
    line-height: 40px;
    padding: 10px 20px;
    color: #fff;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: #1890ff;
    }
  }
  .dropdown-menu {
  }
</style>
