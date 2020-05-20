<template>
  <footer class="footer" :class="className">
    <p class="copyright">Copyright &copy; 2020-2022 moocss.com 版权所有</p>
  </footer>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class Footer extends Vue {
    @Prop({ type: String, default: "" }) private className!: string;
  }
</script>

<style scoped lang="scss">
  .footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    .copyright {
      color: #666;
      font-size: 14px;
    }
  }
</style>
