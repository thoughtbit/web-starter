<template>
  <el-dropdown class="dropdown-userinfo">
    <a href="javascript:;" class="el-dropdown-link">
      <img src="" alt="" class="avatar">
      <span class="name">用户名</span>
      <i class="el-icon-arrow-down el-icon--right" />
    </a>
    <el-dropdown-menu class="dropdown-menu" slot="dropdown">
      <el-dropdown-item>
        <router-link to="/index">个人信息</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <router-link to="/index">系统设置</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <router-link to="/index">账户设置</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <router-link to="/index">密码修改</router-link>
      </el-dropdown-item>
      <el-dropdown-item divided>
        <router-link to="/index">清除缓存</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <router-link to="/index">退出登录</router-link>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class TopUserinfo extends Vue {
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
  .dropdown-userinfo {
    .avatar {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 50%;
    }
    .name {

    }
  }
  .el-dropdown-link {
    display: block;
    height: 60px;
    line-height: 40px;
    padding: 10px 20px;
    color: #fff;
    outline: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: #1890ff;
    }
  }
  .dropdown-menu {
    width: 160px;
  }
</style>
