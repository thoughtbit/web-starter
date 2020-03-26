<template>
  <div class="page page-401">
    <div class="container">
      <h5 class="title">你的页面出错了~</h5>
      <a href="javascript:;" @click="handleBack">返回上一页</a>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MetaInfoError } from "@/config/metaInfo.config";

  @Component({
    name: "Error",
    metaInfo: MetaInfoError
  })
  export default class Error extends Vue {
    private handleBack() {
      this.$router.go(-1);
    }
  }
</script>

<style lang="scss" scoped></style>
