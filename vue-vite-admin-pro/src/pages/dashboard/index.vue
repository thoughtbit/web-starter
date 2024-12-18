<template>
  <page class="page-dashboard" padding="0px">
    <template #header>
      <page-header>
         面包屑
      </page-header>
    </template>
     内容
  </page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Page, PageHeader } from "@/layouts";

export default defineComponent({
  name: "DashboardPage",
  components: {
    Page,
    PageHeader,
  },
});
</script>

<style lang="scss" scoped>
.page {
  &-dashboard {
  }
}
</style>
