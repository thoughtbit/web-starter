<template>
  <nav class="top-bar">
    <top-userinfo />
    <div class="divider" />
    <top-fullscreen />
    <top-logout />
  </nav>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import TopLogout from "@/views/components/topbar/top-logout.vue";
  import TopFullscreen from "@/views/components/topbar/top-fullscreen.vue";
  import TopUserinfo from "@/views/components/topbar/top-userinfo.vue";

  @Component({
    components: {
      TopLogout,
      TopFullscreen,
      TopUserinfo
    }
  })
  export default class TopBar extends Vue {

  }
</script>

<style lang="scss" scoped>
  .top-bar {
    align-items: center;
    justify-content: flex-end;
    display: flex;
    height: 60px;
  }
  .divider {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0;
    overflow: hidden;
    height: 28px;
  }
</style>
