<template>
  <aside :width="collapsed ? '0' : '180px'" class="sider-sub-menu scrollbar">
    <div class="title">{{ menuTitle }}</div>
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
              <span>{{ item.hidden ? "" : item.name }}</span>
            </template>
            <el-menu-item
                class="sider-sub-menu-item"
                :index="subItem.path"
                v-for="(subItem, index) in item.children"
                :key="index"
            >
              <div class="dot"></div>
              <span slot="title">{{ subItem.name }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item class="sider-sub-menu-item" v-else-if="item" :index="item.path">
            <span slot="title">{{ item.hidden ? "" : item.name }}</span>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
  </aside>
</template>

<script lang="ts" src="@/views/components/menu/sider-submenu.ts"></script>

<style lang="scss">
  .sider-sub-menu {
    width: 0;
    background-color: #eceff1;
    transition: width ease-out 400ms;
    overflow-x: hidden;
    overflow-y: auto;
    .title {
      color: #666666;
      font-size: 20px;
      line-height: 20px;
      padding: 23px 0 25px 0;
      margin-left: 19px;
      border-bottom: 1px solid #dde3e6;
      white-space: nowrap;
    }
    .el-menu-vertical .menu-item-wrap {
      border-right: 0;
      .el-menu-item {
        height: auto;
        background-color: #eceff1;
        // color: #333333;
        span {
          line-height: 50px;
          font-size: 16px;
          display: block;
        }
        &.is-active,
        &:hover {
          // color: #1EC6DF;
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
            // color: #1EC6DF;
            background-color: #ffffff;
          }
        }
        .el-menu-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 40px;
          span {
            line-height: 40px;
            font-size: 14px;
          }

          .dot {
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: #666666;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
