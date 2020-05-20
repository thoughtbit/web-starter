<template>
  <header class="header" :class="className">
    <h1 class="header-logo">九色鹿数字云</h1>
    <nav class="quick-menu">
      <router-link class="nav-link" to="/index">
        我的控制台
      </router-link>
       <router-link class="nav-link" to="/about">
        中文 / 英文
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class Header extends Vue {
    @Prop({ type: String, default: "" }) private className!: string;
  }
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    padding: 8px 60px;
    background-color: #2468f2;
    &-logo {
      width: 275px;
      height: 48px;
      text-indent: -999em;
      background: url(../assets/images/logo_w.png) no-repeat 0 50%;
    }
  }

  .quick-menu {
    align-items: center;
    justify-content: flex-end;
    display: flex;
    a {
      margin-left: 20px;
      color: #fff;
    }
  }
</style>
