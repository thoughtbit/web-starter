<template>
  <!-- 最大布局容器 -->
  <el-container class="ui-layout">
    <!-- 头部布局 -->
    <layout-header />
    <!-- 头部以下主体布局 -->
    <el-container class="ui-layout-body">
      <!-- 侧栏一级导航布局 -->
      <aside-menu :menuData="menuData" :collapsed="folded" :activeMenu="activeMenu" @toggleCollapse="toggleFolded" @menuSelect="onMenuSelect" />
      <!-- 侧栏二级导航布局 -->
      <aside-sub-menu :menuData="menuData" :collapsed="collapsed" :menuPath="activeMenu" :menuTitle="menuTitle" @toggleCollapse="toggleCollapse" />
      <!-- 右侧页面区 -->
      <el-main class="ui-layout-content">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { Getter } from "vuex-class";
  import { Route } from "vue-router";

  import LayoutHeader from "@/views/layouts/layout-header.vue";
  import AsideMenu from "@/views/components/menu/aside-menu.vue";
  import AsideSubMenu from "@/views/components/menu/aside-submenu.vue";

  @Component({
    components: {
      LayoutHeader,
      AsideMenu,
      AsideSubMenu
    }
  })
  export default class Layout extends Vue {
    private folded = false;
    private collapsed = true;
    private menuTitle = "";
    private activeMenu = "";

    @Getter routes: any;

    private get menuData() {
      // console.log("menuData: ", this.routes);
      return this.routes;
    }

    private mounted() {
      this.$nextTick(() => {
        const path = this.$route.path;
        this.changeRoute(path);
      });
    }

    @Watch("$route", { immediate: true })
    private onRouteChange(route: Route) {
      this.changeRoute(route.path);
    }

    // 点击收缩开关，部分页面不允许展开
    private toggleCollapse() {
      const menu = this.menuData.find((d: any) => this.activeMenu.startsWith(d.path));
      if (menu) {
        if (!(menu.children instanceof Array && menu.children.find((d: any) => d.hidden === false))) {
          this.collapsed = true;
          return;
        }
      }
      this.collapsed = !this.collapsed;
      // const closeMenus = ['dashboardIndex', 'columnIndex', 'contentIndex']
      // this.collapsed = closeMenus.includes(this.$route.name) || !this.collapsed
    }

    // 点击收缩开关，主导航折叠
    private toggleFolded() {
      this.folded = !this.folded;
    }

    private onMenuSelect(path: string, collapsed: boolean) {
      this.collapsed = collapsed;
      this.activeMenu = path;
      this.menuTitle = this.menuData.find((m: any) => path.startsWith(m.path)).name;
    }
    private changeRoute(path: string) {
      if (path === "/") {
        this.activeMenu = "";
        this.menuTitle = "";
        this.collapsed = true;
        return;
      }
      const activeMenu = this.menuData.find((m: any) => path.startsWith(m.path));
      if (activeMenu) {
        this.activeMenu = activeMenu.path;
        this.menuTitle = activeMenu.name;
        if (activeMenu.children && activeMenu.children.filter((m: any) => !m.hidden).length) {
          this.collapsed = false;
        } else {
          this.collapsed = true;
        }
      }
    }
  }
</script>
