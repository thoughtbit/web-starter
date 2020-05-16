<template>
  <el-aside :width="collapsed ? '0' : '202px'" class="sider-sub-menu scrollbar">
    <div class="el-menu-title">{{$t('menus.'+menuTitle)}}</div>
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical"
      @select="onSelect"
      v-for="(menu, index) in menuData"
      :key="index"
    >
      <template v-for="(item, index) in menu.children">
        <div
          v-show="menuPath.startsWith(menu.path) && !filterMenus.includes(item.name)"
          class="menu-item-wrap"
          :key="index"
        >
          <el-submenu
            class="sider-sub-menu-item"
            :index="item.path"
            v-if="item.children && item.children.filter((c) => !c.hidden).length"
          >
            <template slot="title">
              <span class="title">{{item.hidden ? '':$t('menus.'+item.name)}}</span>
            </template>
            <el-menu-item
              class="sider-sub-menu-item"
              :index="subItem.path"
              v-for="(subItem, index) in item.children"
              :key="index"
            >
              <div class="dot"></div>
              <span class="title" slot="title">{{$t('menus.'+subItem.name)}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item class="sider-sub-menu-item" v-else-if="item" :index="item.path">
            <span class="title" slot="title">{{item.hidden ? '':$t('menus.'+item.name)}}</span>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator";
  import { Getter } from "vuex-class";

  @Component
  export default class SiderSubMenu extends Vue {
    @Getter private setting: any;

    @Prop({ type: Boolean, default: true })
    private collapsed: boolean | undefined;

    @Prop({
      type: Array,
      required: true,
      default: () => []
    })
    private menuData!: any;

    @Prop({ type: String, default: "", required: true })
    private menuPath!: string;

    @Prop({ type: String, default: "", required: true })
    private menuTitle!: string;

    private filterMenus: Array<{}> = [];

    // 设置过滤列表
    private setFilterMenus() {
      this.filterMenus = this.memberRegisterExamine === "1" ? [] : ["vipCheckPending"];
    }

    private onSelect(index: string) {
      // @ts-ignore
      this.$routerLink(index);
    }

    private get memberRegisterExamine() {
      const { memberRegisterExamine } = this.setting.attrs || {};
      return memberRegisterExamine;
    }

    private get activeMenu() {
      // @ts-ignore
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }

    @Watch("memberRegisterExamine")
    private onMemberRegisterExamine() {
      this.setFilterMenus();
    }

    private mounted() {
      this.setFilterMenus();
    }
  }
</script>

<style lang="scss">
  .sider-sub-menu {
    width: 0;
    background-color: #eceff1;
    transition: width ease-out 400ms;
    overflow-x: hidden;
    overflow-y: overlay;
    .el-menu-title {
      color: #666666;
      font-size: 20px;
      line-height: 20px;
      padding: 20px 10px 20px 19px;
      border-bottom: 1px solid #dde3e6;
      white-space: nowrap;
    }
    .el-menu-vertical .menu-item-wrap {
      border-right: 0;
      .el-menu-item {
        height: auto;
        background-color: #eceff1;
        // color: #333333;
        .title {
          line-height: 50px;
          font-size: 16px;
          display: block;
        }
        &.is-active,
        &:hover {
          color: #1EC6DF;
          background-color: #ffffff;
        }
      }
      .el-submenu {
        .el-submenu__title {
          background-color: #eceff1;
          font-size: 16px;
          &.is-active {
            background-color: #eceff1;
          }
          &:hover {
            color: #1EC6DF;
            background-color: #ffffff;
          }
        }
        .el-menu-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 40px;
          .title {
            line-height: 40px;
            font-size: 14px;
          }

          .dot {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #666666;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
