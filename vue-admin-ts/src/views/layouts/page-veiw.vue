<template>
  <div class="page-view-container">
    <el-main class="scrollbar">
      <slot></slot>
      <route-view height="100%" v-if="!noRoute" />
    </el-main>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import RouteView from "@/views/layouts/route-view.vue";

  @Component({
    components: {
      RouteView
    }
  })
  export default class MenuView extends Vue {
    @Prop({
      type: Boolean,
      default: false
    })
    private noRoute: boolean | undefined;
  }
</script>

<style lang="scss" scoped>
  body .page-view-container {
    height: calc(100vh - 106px);
    padding: 20px;
    background-color: #ffffff;
  }
</style>
