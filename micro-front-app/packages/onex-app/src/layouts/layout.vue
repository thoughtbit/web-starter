<template>
  <!-- 最大布局容器 -->
  <el-container class="ui-layout">
    <!-- 头部布局 -->
    <el-header height="64px">
      <layout-header />
    </el-header>
    <!-- 头部以下主体布局 -->
    <el-container class="ui-layout-body">
      <slot></slot>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LayoutHeader from "@/layouts/layout-header.vue";
@Component({
  components: {
    LayoutHeader
  }
})
export default class Layout extends Vue {}
</script>
