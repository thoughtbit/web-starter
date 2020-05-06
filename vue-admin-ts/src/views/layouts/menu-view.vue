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
        <el-tab-pane
          v-for="page in pageList"
          :key="page.fullPath"
          :name="page.fullPath"
          :label="page.name"
        />
      </el-tabs>
    </div>
    <!-- 路由页面 -->
    <div class="menu-view-container">
      <router-view />
    </div>
  </layout>
</template>

<script lang="ts" src="@/views/layouts/menu-view.ts"></script>

<style lang="scss" scoped>
  .view-tabs {
    height: 42px;
    /*line-height: 36px;*/
    /*padding-top: 6px;*/
    /*border-bottom: 1px solid #ddd;*/
    background-color: #eee;
    ul {
      display: flex;
      padding: 0 6px;
      li {
        position: relative;
        display: flex;
        align-content: center;
        padding: 0 10px;
        min-width: 160px;
        text-align: center;
        background-color: #eee;
        border-radius: 6px 6px 0 0;
        margin-left: 1px;
        &:before {
          content: "";
          position: absolute;
          right: 0;
          top: 10px;
          height: 18px;
          width: 1px;
          font-size: 0;
          background-color: #000;
        }
        &:last-child:before {
          display: none;
        }
        &.on,
        &:hover {
          background-color: #999;
          color: #fff;
          &:before {
            display: none;
          }
        }

        .text {
          flex: 1;
          margin: 0 10px;
          text-align: left;
        }
        .ui-icon {
          width: 24px;
          height: 24px;
          line-height: 24px;
          margin-top: 6px;
          background-color: #fff;
        }
        .close {
          margin-top: 8px;
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 20px;
          background-color: transparent;
        }
        .close {
          &:hover {
            background-color: #444;
            color: #fff;
          }
        }
      }
    }
  }
  .menu-view-container {
    flex: 1;
    height: calc(100vh - 42px);
    overflow: auto;
    padding: 20px;
  }
</style>
