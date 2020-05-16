<template>
  <div class="ui-layout-header">
    <h1 class="header-logo">
      <router-link class="logo" to="/"><!--九色鹿-->未来智能云</router-link>
    </h1>
    <nav class="header-service">
      <div class="nav-overview">
        <router-link class="nav-link" to="/">总览</router-link>
      </div>
      <div class="nav-service">产品与服务</div>
    </nav>
    <div class="searchbox">
      <form action="/" method="post" class="search-form">
        <input type="text" name="" id="" class="s-ipt" />
        <button type="button" class="s-btn">搜索</button>
      </form>
    </div>
    <nav class="quick-menu">
      <el-button type="primary" class="quick-menu-button">消息</el-button>
      <el-button type="primary" class="quick-menu-button">我的</el-button>
      <el-button type="primary" @click.native.prevent="logout">退出登录</el-button>
    </nav>
  </div>
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
  .ui-layout-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: #262F3E;
  }
  .header-logo {
    width: 220px;
    padding: 0 10px 0 15px;
    .logo {
      font-size: 24px;
      color: #fff;
    }
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
        padding: 10px;
        line-height: 22px;
      }
      .s-btn {
        width: 100px;
        height: 42px;
        background-color: #ccc;
        color: #1890ff;
      }
    }
  }
  .quick-menu {
    align-items: center;
    justify-content: flex-end;
    display: flex;
    .nav-link {
      color: #fff;
    }

    margin-right: 15px;
  }
  .header-service {
    align-items: center;
    display: flex;
    color: #ffff;
    .nav-overview,
    .nav-service {
      a {
        display: block;
      }
      border: 1px dashed #fff;
      padding: 4px 8px;
      line-height: 22px;
    }
    .nav-overview {
      margin-right: 10px;
    }
  }
</style>
