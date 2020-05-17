<template>
  <header class="header">
    <div class="header-logo">
      <h1 class="logo">{{ msg }} <ui-icon icon-class="account-book-outlined" class="lg" @click="showDialog" /></h1>
    </div>
    <nav class="quick-menu">
      <router-link class="nav-link" to="/login">登录</router-link>
      <router-link class="nav-link" to="/register">注册</router-link>
      <router-link class="nav-link" to="/about">
        关于
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class Header extends Vue {
    @Prop() private msg!: string;

    showDialog() {
      alert("ok");
    }
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
    background-color: #f2f3f4;
  }
  .quick-menu {
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }
</style>
