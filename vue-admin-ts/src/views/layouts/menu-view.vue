<template>
  <layout>
    <!-- 标签上的右键菜单 -->
    <ContextMenu ref="contextMenu" :itemList="menuItemList" :visible.sync="menuVisible" @select="onMenuSelect" />
    <!-- 视图选项卡 -->
    <el-tabs
      class="view-tabs-container"
      type="card"
      closable
      v-model="activePage"
      @tab-click="changePage"
      @tab-remove="removeTab"
      @contextmenu.native="onContextMenu">
      <el-tab-pane v-for="page in pageList" :key="page.fullPath" :name="page.fullPath" :label="$t('menus.'+page.name)" />
    </el-tabs>
    <!-- 路由页面 -->
    <route-view />
  </layout>
</template>

<script lang="ts">
  import { Component, Provide, Vue, Watch } from "vue-property-decorator";
  import { Action } from "vuex-class";
  import Layout from "@/views/layouts/layout.vue";
  import RouteView from "@/views/layouts/route-view.vue";
  import ContextMenu from "@/views/components/menu/context-menu.vue";

  @Component({
    components: {
      Layout,
      RouteView,
      ContextMenu,
    }
  })
  export default class MenuView extends Vue {
    @Action("permission/delExcludes") private delExcludes: any;
    @Action("permission/addExcludes") private addExcludes: any;
    @Action("permission/asyncIncludes") private asyncIncludes: any;
    @Action("permission/delIncludes") private delIncludes: any;
    @Action("permission/addIncludes") private addIncludes: any;

    @Provide("removeTab")
    @Provide("reflushCurrentPage")
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
    onRoute(newRoute: any) {
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
      if (key) this.$router.push(key);
    }

    @Watch("pageList")
    onPageList(newData: string) {
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

    private removeTab(key: string) {
      if (key.startsWith("/index")) {
        this.$message("总览不能关闭");
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

    private onMenuSelect(key: string, pageKey: any) {
      switch (key) {
        case "1":
          this.reflushCurrentPage(pageKey);
          break;
        case "2":
          this.removeTab(pageKey);
          break;
        case "3":
          this.closeOthersPage(pageKey);
          break;
        case "4":
          this.closeAllPage();
          break;
        default:
          break;
      }
    }

    // 刷新当前页
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
      //   if (i !== index) this.AddExcludes(d.name)
      // })
      // @ts-ignore
      const overview = this.pageList.find((d) => d.name === "overview");

      this.linkList = this.linkList.slice(index, index + 1);
      this.pageList = this.pageList.slice(index, index + 1);
      let idx = 0;
      // @ts-ignore
      if (overview && !this.pageList.find((d) => d.name === "overview")) {
        // @ts-ignore
        this.linkList.splice(0, 0, overview.fullPath);
        this.pageList.splice(0, 0, overview);
        idx = 1;
      }
      this.activePage = this.linkList[idx];
    }

    // 关闭所有页面
    private closeAllPage() {
      // this.pageList.forEach(d => {
      //   this.addExcludes(d.name)
      // })
      // @ts-ignore
      const overview = this.pageList.find((d) => d.name === "overview");
      // @ts-ignore
      this.linkList = overview ? [overview.fullPath] : [];
      this.pageList = overview ? [overview] : [];
      // @ts-ignore
      this.activePage = overview ? overview.fullPath : "/index";
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
        const pageList = pageListStr ? JSON.parse(pageListStr).pageList : [];
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
</script>
<style lang="scss">
  .view-tabs-container {
    background-color: #f3f5f7;
    padding: 10px 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    .el-tabs__header {
      border: 0 none;
      margin-bottom: 0;
      .el-tabs__nav {
        border: 0 none;
        margin-left: 1px;
        .el-tabs__item {
          position: relative;
          z-index: 1;
          padding: 0 21px;
          margin-left: -1px;
          border: 1px solid transparent;
          border-bottom: 0 none;
          border-radius: 2px 12px 0 0;
          color: #555;
          line-height: 38px;
          height: 38px;
          user-select: none;
          font-weight: normal;
          .el-icon-close {
            position: absolute;
            right: 10px;
            top: 50%;
            margin-top: -7px;
            font-size: 14px;
          }
          &:before,
          &:after {
            position: absolute;
            top: 50%;
            margin-top: -8px;
            height: 16px;
            content: "";
          }
          &:after {
            right: -1px;
            border-left: 1px solid rgba(0, 0, 0, 0.08);
          }
          &:before {
            left: -1px;
            border-left: 1px solid rgba(0, 0, 0, 0.08);
          }

          &.is-active,
          &:hover {
            z-index: 2;
            padding: 0 35px 0 15px;
            border-color: #dfe4ed;
            background: #fff;
            // background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255,1) 100%);
            &:before,
            &:after {
              display: none;
            }
          }
          &:hover {
            border-color: rgba(0, 0, 0, 0.08);
            background-color: #eee;
          }
          &.is-active {
            &:hover {
              background-color: #fff;
            }
          }
          &:first-child {
            &:before {
              display: none;
            }
            padding-right: 15px;
            .el-icon-close {
              display: none;
            }
          }
          &:last-child {
            &:after {
              display: none;
            }
          }
        }
      }
    }

    .el-tabs__nav-wrap {
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        height: 34px;
        width: 18px;
        text-align: center;
        line-height: 34px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        background-color: #fff;
        &:hover {
          border-color: #1ec6df;
          color: #1ec6df;
        }
      }
    }

    .el-tabs__content {
      height: 0;
      overflow: hidden;
    }
  }
</style>
