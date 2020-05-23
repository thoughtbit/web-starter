<template>
  <div class="oenx-app-container">
    <!-- 最大布局容器 -->
    <el-container class="ui-layout" v-show="!$route.meta.withoutLayout">
      <!-- 头部布局 -->
      <el-header height="64px">
        <layout-header />
      </el-header>
      <!-- 头部以下主体布局 -->
      <el-container class="ui-layout-body">
        <h4 v-if="loading" class="subapp-loading">Loading...</h4>
        <!--- 子应用的容器 -->
        <router-view v-show="$route.name" />
        <div v-show="!$route.name" id="subapp-viewport" v-html="appContent"></div>
      </el-container>
    </el-container>
    <router-view v-show="$route.meta.withoutLayout" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import LayoutHeader from "@/layouts/layout-header.vue";
@Component({
  components: {
    LayoutHeader
  }
})
export default class App extends Vue {
  @Prop({ type: String, default: "" }) private appContent!: string;
  @Prop({ type: Boolean, default: false }) private loading!: boolean;
}
</script>

