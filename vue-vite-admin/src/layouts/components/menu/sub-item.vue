<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <el-icon>
          <svg-icon :name="subItem.icon" />
        </el-icon>
        <span class="title">{{ subItem.title }}</span>
      </template>
      <sub-item :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path">
      <el-icon>
        <svg-icon :name="subItem.icon" />
      </el-icon>
      <template v-if="!subItem.link" #title>
        <span class="title">{{ subItem.title }}</span>
      </template>
      <template v-else #title>
        <a class="href" :href="subItem.link" target="_blank">{{ subItem.title }}</a>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import SvgIcon from "@/components/svg-icon/svg-icon.vue";

export default defineComponent({
  name: "SubItem",
  props: {
    menuList: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
  components: { SvgIcon },
});
</script>
