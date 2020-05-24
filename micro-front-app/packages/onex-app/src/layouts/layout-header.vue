<template>
  <div class="ui-layout-header">
    <h1 class="header-logo">
      <router-link class="logo" to="/">九色鹿数字云</router-link>
    </h1>
    <nav class="quick-nav">
      <a @click="onChangePage('/app1')">应用1</a>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LayoutHeader extends Vue {
  onChangePage(url: string) {
    console.log(url);
    this.routerGo(url, "子应用");
  }

  routerGo(href = "/", title = "", stateObj = {}) {
    window.history.pushState(stateObj, title, href);
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
  background-color: #262f3e;
}
.header-logo {
  width: 220px;
  padding: 0 10px 0 15px;
  .logo {
    font-size: 24px;
    color: #fff;
  }
}
  .quick-nav {
    margin-right: 15px;
    a {
      color: #fff;
    }
  }
</style>
