<template>
  <div class="ui-layout">
    <div class="ui-layout-sider">
      <div class="menu">
        <ul>
          <li>
            <a href="javascript:;" @click="$router.push('/module1')">子系统</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="ui-layout-main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
<style scoped lang="scss">
.ui-layout {
  display: flex;
  align-items: center;
  &-sider {
    width: 200px;
    background-color: #f5f5f5;
  }
  &-main {
    flex: 1;
  }
}
</style>
