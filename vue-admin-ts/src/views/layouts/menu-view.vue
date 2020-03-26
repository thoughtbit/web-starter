<template>
  <layout>
    <!-- 标签页tabs -->
    <div class="view-tabs">
      标签页
    </div>
    <!-- 路由页面 -->
    <div class="menu-view-container">
      <router-view />
    </div>
  </layout>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Layout from "./layout.vue";
  @Component({
    components: {
      Layout
    }
  })
  export default class MenuView extends Vue {}
</script>

<style lang="scss" scoped>

</style>
