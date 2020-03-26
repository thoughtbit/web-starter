<template>
  <div class="page page-404">
    <div class="container">
      <h5 class="title">404 Not Found</h5>
      <p class="subtitle">{{ message }}</p>
      <a href="javascript:" @click="handleBack">返回上一页</a>
      <a href="javascript:" @click="handleLogin">重新登录</a>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MetaInfo404 } from "@/config/metaInfo.config";

  @Component({
    name: "NotFound",
    metaInfo: MetaInfo404
  })
  export default class NotFound extends Vue {
    private message = "页面被外星人吃掉了~";

    mounted() {
      if (window.location.pathname !== "/404") {
        window.location.href = "/404";
      }
    }

    get isLocation404(): boolean {
      return window && window.location.pathname === "/404";
    }

    private handleBack() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    }
    private handleLogin() {
      this.$router.push("/login");
    }
  }
</script>

<style lang="scss" scoped>
  .page-404 {
    background-color: #fff;
  }
</style>
