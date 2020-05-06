import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Route } from "vue-router";

import LayoutHeader from "@/views/layouts/layout-header.vue";
import SiderMenu from "@/views/components/menu/sider-menu.vue";
import SiderSubMenu from "@/views/components/menu/sider-submenu.vue";

@Component({
  components: {
    LayoutHeader,
    SiderMenu,
    SiderSubMenu
  }
})
export default class Layout extends Vue {
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
    // const closeMenus = ['workplaceIndex', 'columnIndex', 'contentIndex']
    // this.collapsed = closeMenus.includes(this.$route.name) || !this.collapsed
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
