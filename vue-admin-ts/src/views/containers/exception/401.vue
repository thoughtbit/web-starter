<template>
  <div class="page page-401">
    <ui-header msg="无权访问页面" />
    <div class="container">
      <h5 class="title">你没有权限去该页面</h5>
      <p class="subtitle">{{ message }}</p>
      <a href="javascript:;" @click="back">返回</a>
    </div>
    <ui-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MetaInfo401 } from "@/config/metaInfo.config";

  @Component({
    name: "Unauthorized",
    metaInfo: MetaInfo401
  })
  export default class Unauthorized extends Vue {
    private message = "你的页面被外星人劫持了~, 如有不满请联系管理员.";

    private back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/workplace" });
      } else {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" scoped></style>
