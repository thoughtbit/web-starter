import { Component, Provide, Vue, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";
import Layout from "@/views/layouts/layout.vue";
import RouteView from "@/views/layouts/route-view.vue";
import ContextMenu from "@/views/components/menu/context-menu.vue";

@Component({
  components: {
    Layout,
    RouteView,
    ContextMenu
  }
})
export default class MenuView extends Vue {
  @Action("permission/delExcludes") private delExcludes: any;
  @Action("permission/addExcludes") private addExcludes: any;
  @Action("permission/asyncIncludes") private asyncIncludes: any;
  @Action("permission/delIncludes") private delIncludes: any;
  @Action("permission/addIncludes") private addIncludes: any;

  // @ts-ignore
  @Provide() removeTab = "removeTab";
  // @ts-ignore
  @Provide() reflushCurrentPage = "reflushCurrentPage";

  private pageList = [];
  private linkList = [];
  private activePage = "";
  private menuVisible = false;
  private menuItemList = [
    { key: "1", text: "刷新" },
    { key: "2", text: "关闭" },
    { key: "3", text: "关闭其他" },
    { key: "4", text: "关闭所有" }
  ];

  get getPageList() {
    return this.pageList.map((path) => {
      if (path !== "/") return path;
    });
  }

  private created() {
    // @ts-ignore
    const path = this.$route.fullPath;
    if (path !== "/") {
      // @ts-ignore
      this.pageList.push(this.$route);
      // @ts-ignore
      this.linkList.push(path);
      this.activePage = path;
    }
  }

  @Watch("$route")
  onRoute(newRoute: any, oldRoute: any) {
    if (newRoute.path !== "/") {
      this.activePage = newRoute.fullPath;
      // 将fullPage转成path，如果存在表示重复，需要进行替换
      // @ts-ignore
      const linkList = this.linkList.map((p) => p.split("?")[0]);
      const index = linkList.indexOf(newRoute.path);
      if (index < 0) {
        // @ts-ignore
        this.linkList.push(newRoute.fullPath);
        // @ts-ignore
        this.pageList.push(newRoute);
      } else {
        // @ts-ignore
        this.linkList.splice(index, 1, newRoute.fullPath);
        // @ts-ignore
        this.pageList.splice(index, 1, newRoute);
      }
    }
  }

  @Watch("activePage")
  onActivePage(key: any) {
    if (key) {
      // @ts-ignore
      this.$router.push(key);
    }
  }

  @Watch("pageList")
  onPageList(newData: string, oldData: string) {
    // @ts-ignore
    let pageList = [];
    // @ts-ignore
    newData.forEach((d: any) => {
      const { fullPath, name, meta, params, path, query } = d;
      pageList.push({
        fullPath,
        name,
        meta,
        params,
        path,
        query
      });
    });
    // @ts-ignore
    window.localStorage.setItem("pageList", JSON.stringify({ pageList }));
    // @ts-ignore
    this.asyncIncludes(newData.map((d: any) => d.name));
  }

  private changePage(tab: any) {
    this.activePage = tab.name;
  }

  // @ts-ignore
  private removeTab(key: any) {
    if (key.startsWith("/workplace")) {
      // @ts-ignore
      this.$message("工作台不能关闭");
      return;
      // const pageName = this.pageList[0].name
      // this.addExcludes(pageName)
      // this.$nextTick(() => {
      //   this.delExcludes(pageName)
      // })
    }
    // @ts-ignore
    let index = this.linkList.indexOf(key);
    const removePage = this.linkList[index];
    this.linkList = this.linkList.filter((item) => item !== key);
    // @ts-ignore
    this.pageList = this.pageList.filter((item) => item.fullPath !== key);
    index = index >= this.linkList.length ? this.linkList.length - 1 : index;
    if (index >= 0) {
      if (removePage === this.activePage) this.activePage = this.linkList[index];
    } else {
      this.activePage = "";
      // @ts-ignore
      this.$routerLink("/");
    }
  }

  private onContextMenu(e: any) {
    e.preventDefault();
    const id = e.target.id;
    if (id) {
      this.menuVisible = true;
      // @ts-ignore
      this.$refs.contextMenu.setPosition(e);
    }
  }

  private onMenuSelect(key: string, pageKey:any) {
    switch (key) {
      case "1":
        // @ts-ignore
        this.reflushCurrentPage(pageKey);
        break;
      case "2":
        // @ts-ignore
        this.removeTab(pageKey);
        break;
      case "3":
        this.closeOthersPage(pageKey);
        break;
      case "4":
        this.closeAllPage(pageKey);
        break;
      default:
        break;
    }
  }

  // 刷新当前页
  // @ts-ignore
  private reflushCurrentPage(pageKey: any) {
    // @ts-ignore
    const page = this.pageList.find((p) => p.fullPath === pageKey);
    if (page) {
      const that = this;
      // @ts-ignore
      const pageName = page.name;
      this.delIncludes(pageName);
      this.$nextTick(() => {
        setTimeout(() => {
          that.addIncludes(pageName);
        }, 100);
      });
      // this.addExcludes(pageName)
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     that.delExcludes(pageName)
      //   }, 100)
      // })
    }
  }

  // 关闭其他页
  private closeOthersPage(pageKey: any) {
    // @ts-ignore
    let index = this.linkList.indexOf(pageKey);
    // this.pageList.forEach((d, i) => {
    //   if (i !== index) this.addExcludes(d.name)
    // })
    // @ts-ignore
    const workplaceIndex = this.pageList.find((d) => d.name === "workplace");

    this.linkList = this.linkList.slice(index, index + 1);
    this.pageList = this.pageList.slice(index, index + 1);
    let idx = 0;
    // @ts-ignore
    if (workplaceIndex && !this.pageList.find((d) => d.name === "workplace")) {
      // @ts-ignore
      this.linkList.splice(0, 0, workplaceIndex.fullPath);
      this.pageList.splice(0, 0, workplaceIndex);
      idx = 1;
    }
    this.activePage = this.linkList[idx];
  }

  // 关闭所有页面
  private closeAllPage(pageKey: any) {
    // this.pageList.forEach(d => {
    //   this.addExcludes(d.name);
    // })
    // @ts-ignore
    const workplaceIndex = this.pageList.find((d) => d.name === "workplace");
    // @ts-ignore
    this.linkList = workplaceIndex ? [workplaceIndex.fullPath] : [];
    this.pageList = workplaceIndex ? [workplaceIndex] : [];
    // @ts-ignore
    this.activePage = workplaceIndex ? workplaceIndex.fullPath : "/workplace";
  }

  // 关闭左侧页
  private closeLeft(pageKey: any) {
    // @ts-ignore
    let index = this.linkList.indexOf(pageKey);
    this.linkList = this.linkList.slice(index);
    this.pageList = this.pageList.slice(index);
    // @ts-ignore
    if (this.linkList.indexOf(this.activePage) < 0) {
      this.activePage = this.linkList[0];
    }
  }

  // 关闭右侧页
  private closeRight(pageKey: any) {
    // @ts-ignore
    let index = this.linkList.indexOf(pageKey);
    this.linkList = this.linkList.slice(0, index + 1);
    this.pageList = this.pageList.slice(0, index + 1);
    // @ts-ignore
    if (this.linkList.indexOf(this.activePage < 0)) {
      this.activePage = this.linkList[this.linkList.length - 1];
    }
  }

  private mounted() {
    try {
      const pageListStr = window.localStorage.getItem("pageList");
      // @ts-ignore
      const pageList = JSON.parse(pageListStr).pageList;
      if (pageList instanceof Array && pageList.length) {
        // @ts-ignore
        this.pageList = pageList;
        // @ts-ignore
        this.linkList = pageList.map((d) => d.fullPath);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
