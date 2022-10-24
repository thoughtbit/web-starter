<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { filterHiddenRoute, findRouteItemByPath } from "@/router/route-util";
import { uniqBy } from "lodash-es";
import { usePermissionStore } from "@/store/permission";

const route = useRoute();
const permissionStore = usePermissionStore();

const routes = filterHiddenRoute(permissionStore.routes);

const breadcrumbList = computed(() => {
  const filteredRoutes = findRouteItemByPath(routes, route.path);
  return uniqBy([{ path: "/", meta: { title: "首页" } }, ...filteredRoutes], "path");
});
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
      <router-link :to="item.path">
        {{ item.meta?.title }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
