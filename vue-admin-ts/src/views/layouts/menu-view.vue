<template>
  <layout>
    <!-- 标签页容器 -->
    <div class="view-tabs">
      <!-- 标签上的右键菜单 -->
      <ContextMenu ref="contextMenu" :itemList="menuItemList" :visible.sync="menuVisible" @select="onMenuSelect" />
      <!-- tabs -->
      <el-tabs
        class="menus-tabs-container"
        type="card"
        closable
        v-model="activePage"
        @tab-click="changePage"
        @tab-remove="removeTab"
        @contextmenu.native="onContextMenu"
      >
        <el-tab-pane v-for="page in pageList" :key="page.fullPath" :name="page.fullPath" :label="page.name" />
      </el-tabs>
    </div>
    <!-- 路由页面 -->
    <div class="menu-view-container">
      <router-view />
    </div>
  </layout>
</template>

<script lang="js">
  import Layout from "@/views/layouts/layout.vue";
  import ContextMenu from "@/views/components/menu/context-menu.vue";

  import { mapActions } from "vuex";

  export default {
    name: "MenuView",
    components: {
      Layout,
      ContextMenu
    },
    provide() {
      return {
        removeTab: this.removeTab,
        reflushCurrentPage: this.reflushCurrentPage
      }
    },
    // inject: ['removeTab'], // 子页面注入后可删除标签页
    data() {
      return {
        pageList: [],
        linkList: [],
        activePage: '',
        menuVisible: false,
        menuItemList: [
          { key: '1', text: '刷新' },
          { key: '2', text: '关闭' },
          { key: '3', text: '关闭其他' },
          { key: '4', text: '关闭所有' }
        ]
      }
    },
    computed: {
      getPageList() {
        return this.pageList.map(path => {
          if (path !== '/') return path;
        })
      }
    },
    created() {
      const path = this.$route.fullPath;
      if (path !== '/') {
        this.pageList.push(this.$route);
        this.linkList.push(path);
        this.activePage = path;
      }
    },
    watch: {
      '$route': function(newRoute, oldRoute) {
        if (newRoute.path !== '/') {
          this.activePage = newRoute.fullPath
          // 将fullPage转成path，如果存在表示重复，需要进行替换
          const linkList = this.linkList.map(p => p.split('?')[0]);
          const index = linkList.indexOf(newRoute.path);
          if (index < 0) {
            this.linkList.push(newRoute.fullPath);
            this.pageList.push(newRoute);
          } else {
            this.linkList.splice(index, 1, newRoute.fullPath);
            this.pageList.splice(index, 1, newRoute);
          }
        }
      },
      'activePage': function(key) {
        if (key) this.$router.push(key);
      },
      pageList(newData, oldData) {
        let pageList = []
        newData.forEach(d => {
          const { fullPath, name, meta, params, path, query } = d;
          pageList.push({
            fullPath, name, meta, params, path, query
          });
        })
        window.localStorage.setItem('pageList', JSON.stringify({ pageList }));
        this.asyncIncludes(newData.map(d => d.name));
      }
    },
    methods: {
      ...mapActions('permission', ['delExcludes', 'addExcludes', 'asyncIncludes', 'delIncludes', 'addIncludes']),
      changePage(tab) {
        this.activePage = tab.name;
      },
      removeTab(key) {
        if (key.startsWith('/workplace/index')) {
          this.$message('工作台不能关闭');
          return;
          // const pageName = this.pageList[0].name
          // this.addExcludes(pageName)
          // this.$nextTick(() => {
          //   this.delExcludes(pageName)
          // })
        }
        let index = this.linkList.indexOf(key);
        const removePage = this.linkList[index];
        this.linkList = this.linkList.filter(item => item !== key);
        this.pageList = this.pageList.filter(item => item.fullPath !== key);
        index = index >= this.linkList.length ? this.linkList.length - 1 : index
        if (index >= 0) {
          if (removePage === this.activePage) this.activePage = this.linkList[index];
        } else {
          this.activePage = '';
          this.$routerLink('/');
        }
      },
      onContextMenu(e) {
        e.preventDefault();
        const id = e.target.id;
        if (id) {
          this.menuVisible = true;
          this.$refs.contextMenu.setPosition(e);
        }
      },
      onMenuSelect(key, pageKey) {
        switch (key) {
          case '1':
            this.reflushCurrentPage(pageKey);
            break;
          case '2':
            this.removeTab(pageKey);
            break;
          case '3':
            this.closeOthersPage(pageKey);
            break;
          case '4':
            this.closeAllPage(pageKey);
            break;
          default:
            break;
        }
      },
      // 刷新当前页
      reflushCurrentPage(pageKey) {
        const page = this.pageList.find(p => p.fullPath === pageKey)
        if (page) {
          const that = this;
          const pageName = page.name;
          this.delIncludes(pageName);
          this.$nextTick(() => {
            setTimeout(() => {
              that.addIncludes(pageName);
            }, 100)
          })
          // this.addExcludes(pageName)
          // this.$nextTick(() => {
          //   setTimeout(() => {
          //     that.delExcludes(pageName)
          //   }, 100)
          // })
        }
      },
      // 关闭其他页
      closeOthersPage(pageKey) {
        let index = this.linkList.indexOf(pageKey);
        // this.pageList.forEach((d, i) => {
        //   if (i !== index) this.AddExcludes(d.name)
        // })
        const workplaceIndex = this.pageList.find(d => d.name === 'workplaceIndex');

        this.linkList = this.linkList.slice(index, index + 1);
        this.pageList = this.pageList.slice(index, index + 1);
        let idx = 0;
        if (workplaceIndex && !this.pageList.find(d => d.name === 'workplaceIndex')) {
          this.linkList.splice(0, 0, workplaceIndex.fullPath);
          this.pageList.splice(0, 0, workplaceIndex);
          idx = 1;
        }
        this.activePage = this.linkList[idx];
      },
      // 关闭所有页面
      closeAllPage(pageKey) {
        // this.pageList.forEach(d => {
        //   this.addExcludes(d.name)
        // })
        const workplaceIndex = this.pageList.find(d => d.name === 'workplaceIndex');
        this.linkList = workplaceIndex ? [workplaceIndex.fullPath] : [];
        this.pageList = workplaceIndex ? [workplaceIndex] : [];
        this.activePage = workplaceIndex ? workplaceIndex.fullPath : '/workplace/index';
      },
      // 关闭左侧页
      closeLeft(pageKey) {
        let index = this.linkList.indexOf(pageKey);
        this.linkList = this.linkList.slice(index);
        this.pageList = this.pageList.slice(index);
        if (this.linkList.indexOf(this.activePage) < 0) {
          this.activePage = this.linkList[0];
        }
      },
      // 关闭右侧页
      closeRight(pageKey) {
        let index = this.linkList.indexOf(pageKey);
        this.linkList = this.linkList.slice(0, index + 1);
        this.pageList = this.pageList.slice(0, index + 1);
        if (this.linkList.indexOf(this.activePage < 0)) {
          this.activePage = this.linkList[this.linkList.length - 1];
        }
      }
    },
    mounted() {
      try {
        const pageListStr = window.localStorage.getItem('pageList');
        const pageList = pageListStr ? JSON.parse(pageListStr).pageList : [];
        if (pageList instanceof Array && pageList.length) {
          this.pageList = pageList;
          this.linkList = pageList.map(d => d.fullPath);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .view-tabs {
    height: 42px;
  }

  .menus-tabs-container {
    background-color: #f5f5f5;
    /*padding-top: 8px;*/
    /*padding-bottom: 1px;*/
    .el-tabs__header {
      margin-bottom: 0 !important;
      border-bottom: 0;
      margin-left: 10px;
      .el-tabs__nav-wrap {
        .el-tabs__nav {
          border: 0;
          .el-tabs__item {
            background-color: #e6e6e6;
            border: 1px solid rgba(225, 225, 225, 1);
            border-bottom: 0;
            border-radius: 4px 4px 0px 0px;
            margin-right: 4px;
            font-size: 14px;
            color: #666666;
            line-height: 34px;
            height: 34px;
            padding: 0 10px 0 26px;
            .el-icon-close {
              margin-left: 25px;
              width: 14px;
            }
            &.is-active,
            &:hover {
              background-color: #ffffff;
            }

            &:first-child {
              .el-icon-close {
                display: none !important;
              }
            }
          }
        }
        .el-tabs__nav-prev,
        .el-tabs__nav-next {
          line-height: 34px;
        }
      }
    }
    .el-tabs__content {
      height: 0;
    }
  }

  .menu-view-container {
    flex: 1;
    height: calc(100vh - 42px);
    overflow: auto;
    padding: 20px;
  }
</style>
