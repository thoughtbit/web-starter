<template>
  <header class="layout-header">
    <button class="guide-button">菜单</button>
    <div class="header-logo">
      <h1 class="logo">某某平台</h1>
    </div>
    <div class="searchbox">
      <form action="/" method="post" class="search-form">
        <input type="text" name="" id="" class="s-ipt" />
        <button type="button" class="s-btn">搜索</button>
      </form>
    </div>
    <nav class="quick-menu">
      <router-link class="nav-link" to="/">首页</router-link>
      <router-link class="nav-link" to="/login">登录</router-link>
      <router-link class="nav-link" to="/about">关于</router-link>
      <button type="button" class="quick-menu-button">消息</button>
      <button type="button" class="quick-menu-button">我的</button>
      <el-button type="primary" @click.native.prevent="logout">退出登录</el-button>
    </nav>
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class LayoutHeader extends Vue {
    private logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // @ts-ignore
          await this.$store.dispatch("auth/logout").then(() => {
            // @ts-ignore
            this.$router.push({ path: `/login?redirect=${escape(this.$route.fullPath)}` });
          });
        })
        .catch(() => {
          return false;
        });
    }
  }
</script>

<style lang="scss" scoped>
  .layout-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: #f2f3f4;
    border-bottom: 1px solid #ddd;
  }
  .searchbox {
    display: flex;
    flex: 1;
    max-width: 640px;
    margin: 0 auto;
    .search-form {
      display: flex;
      flex: 1;
      align-items: center;
      .s-ipt {
        flex: 1;
        height: 42px;
      }
      .s-btn {
        width: 100px;
        height: 42px;
        border: 1px solid #000;
        background-color: red;
      }
    }
  }
  .quick-menu {
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }
</style>
