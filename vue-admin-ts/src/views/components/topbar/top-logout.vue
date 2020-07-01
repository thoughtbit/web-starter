<template>
  <el-tooltip effect="dark" content="退出登录" placement="bottom">
    <div class="top-bar__item">
      <a href="javascript:;" @click.stop.prevent="logout" class="logout-link">
        <ui-icon icon-class="export-outlined" class="xl" />
      </a>
    </div>
  </el-tooltip>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class TopLogout extends Vue {
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
  .logout-link {
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
</style>
