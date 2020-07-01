<template>
  <div class="route-view-container scrollbar">
    <keep-alive :include="includes" style="height: 100%">
      <router-view v-if="includes.includes($route.name)" />
    </keep-alive>
    <router-view v-if="!includes.includes($route.name)" />
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { State } from "vuex-class";

  @Component
  export default class RouteView extends Vue {
    // private excludes!: any;
    private includes!: any;

    @State("permission") private permissionGlobal: any;

    private created() {
      this.includes = this.permissionGlobal.includes;
    }
  }
</script>
<style lang="scss" scoped>
  .route-view-container {
    height: calc(100% - 48px);
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
