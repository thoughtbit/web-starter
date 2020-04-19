<template>
  <layout>
    <!-- 标签页tabs -->
    <div class="view-tabs">
      <ul class="tabs">
        <li class="tabs-trigger on">
          <i class="ui-icon"></i>
          <span class="text">工作台</span>
          <span class="close">x</span>
        </li>
        <li class="tabs-trigger">
          <i class="ui-icon"></i>
          <span class="text">用户管理</span>
          <span class="close">x</span>
        </li>
        <li class="tabs-trigger">
          <i class="ui-icon"></i>
          <span class="text">日志管理</span>
          <span class="close">x</span>
        </li>
      </ul>
    </div>
    <!-- 路由页面 -->
    <div class="menu-view-container">
      <router-view />
    </div>
  </layout>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Layout from "./layout.vue";
  @Component({
    components: {
      Layout
    }
  })
  export default class MenuView extends Vue {}
</script>

<style lang="scss" scoped>
  .view-tabs {
    height: 42px;
    line-height: 36px;
    padding-top: 6px;
    border-bottom: 1px solid #ddd;
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
        .ui-icon{
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
        .close  {
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
