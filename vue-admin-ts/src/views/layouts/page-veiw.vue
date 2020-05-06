<template>
  <div class="page-view-container">
    <slot></slot>
    <router-view v-if="!noRoute" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";

  @Component
  export default class MenuView extends Vue {
    @Prop({
      type: Boolean,
      default: false
    })
    private noRoute: boolean | undefined;
  }
</script>

<style lang="scss" scoped>
  .page-view-container {
  }
</style>
