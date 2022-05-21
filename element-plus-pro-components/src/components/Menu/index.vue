<template>
  <el-menu class="ui-menu-vertical" :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item v-if="!item[children] || !item[children].length" :index="item[index]">
        <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
        <span>{{ item[name] }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
        <template #title>
          <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item v-for="(item1, index1) in item[children]" :key="index1" :index="item1.index">
          <component v-if="item1[icon]" :is="`el-icon-${toLine(item1[icon])}`"></component>
          <span>{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { toLine } from "@/utils/is";

export default defineComponent({
  name: "ui-menu",
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
    // 默认选中的菜单
    defaultActive: {
      type: String,
      default: "",
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
    // 键名
    // 菜单标题的键名
    name: {
      type: String,
      default: "name",
    },
    // 菜单标识的键名
    index: {
      type: String,
      default: "index",
    },
    // 菜单图标的键名
    icon: {
      type: String,
      default: "icon",
    },
    // 菜单子菜单的键名
    children: {
      type: String,
      default: "children",
    },
  },
  setup() {
    return {
      toLine,
    };
  },
});
</script>

<style scoped lang="scss">
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}
.ui-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
