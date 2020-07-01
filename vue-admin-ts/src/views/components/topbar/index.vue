<template>
  <nav class="top-bar">
    <el-tooltip
        effect="dark"
        content="退出登录"
        placement="bottom">
      <div class="top-bar__item">
        <a href="javascript:;" @click.stop.prevent="logout" class="logout-link">退出登录</a>
      </div>
    </el-tooltip>
  </nav>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class TopBar extends Vue {
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
  .top-bar {
    align-items: center;
    justify-content: flex-end;
    display: flex;
    height: 60px;
    margin-right: 15px;
  }
</style>
