
<!-- 最大布局容器 -->
<el-container class="ui-layout">
  <!-- 头部布局 -->
  <el-header height="64px">
    <layout-header />
  </el-header>
  <!-- 头部以下主体布局 -->
  <el-container class="ui-layout-body">
    <!-- 侧栏一级导航布局 -->
    <sider-menu :menuData="menuData" :activeMenu="activeMenu" @menuSelect="onMenuSelect" />
    <!-- 侧栏一级导航布局 -->
    <sider-sub-menu :menuData="menuData" :collapsed="collapsed" :menuPath="activeMenu" :menuTitle="menuTitle" />
    <!-- 右侧页面区 -->
    <el-main class="ui-layout-content">
      <slot></slot>
    </el-main>
  </el-container>
</el-container>
