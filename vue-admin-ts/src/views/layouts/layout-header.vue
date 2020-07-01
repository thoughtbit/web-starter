<template>
  <!-- 头部布局 -->
  <el-header class="ui-layout-header">
    <h1 class="header-logo">
      <router-link class="logo" to="/">九色鹿数字云</router-link>
    </h1>
    <nav class="header-service">
      <div class="nav-service">
        <i class="el-icon el-icon-menu"></i>
        <span class="name">产品与服务</span>
        <i class="el-icon-arrow-down"></i>
      </div>
    </nav>
    <div class="searchbox">
      <input type="text" name="" id="" class="s-ipt" />
      <el-button size="medium" round icon="el-icon-search" class="s-btn"></el-button>
    </div>
    <div class="header-content"></div>
    <top-bar />
  </el-header>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import TopBar from "@/views/components/topbar/index.vue";

  @Component({
    components: {
      TopBar
    }
  })
  export default class LayoutHeader extends Vue {

  }
</script>

<style lang="scss" scoped>
  .ui-layout-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
  .header-content {
    flex: 1 1;
    height: 60px;
  }
  .searchbox {
    position: relative;
    display: flex;
    flex: 1;
    max-width: 480px;
    margin: 0 auto;
    align-items: center;
    .s-ipt {
      flex: 1;
      height: 36px;
      padding: 5px 65px 5px 15px;
      line-height: 22px;
      background-color: rgba(0, 0, 0, 0.4);
      color: #1890ff;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      outline: none;
      &:focus {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
    .s-btn {
      position: absolute;
      right: 0;
      width: 60px;
      height: 36px;
      outline: none;
      background-color: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      &:hover {
        background-color: rgba(255, 255, 255, 0.9);
        color: #333;
      }
    }
  }

  .header-service {
    align-items: center;
    display: flex;
    color: #ffff;
    font-size: 14px;
    .nav-overview,
    .nav-service {
      border: 1px dashed #fff;
      padding: 6px 12px;
      line-height: 22px;
      border-radius: 20px;
      .name {
        margin: 0 10px;
      }
      &:hover {
        background-color: #11151d;
      }
    }
    .nav-overview {
      margin-right: 10px;
    }
  }
</style>
