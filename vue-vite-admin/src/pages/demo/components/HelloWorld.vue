<template>
  <div class="md:container md:mx-auto">
    <div class="box">
      <h1>{{ msg }}, {{ MODE }}</h1>
      <h2 class="title">{{ title }}</h2>

      <button class="btn" type="button" @click="count++">count is: {{ count }}</button>

      <p>
        <button class="btn" @click="toggleDark()">
          <span v-if="isDark">Dark</span>
          <span v-else>Light</span>
        </button>
      </p>

      <p><input type="checkbox" name="sex" id="" /> 男 <input type="checkbox" name="sex" id="" /> 男</p>
      <p><input type="radio" name="sex" id="" /> 男 <input type="radio" name="sex" id="" /> 男</p>
      <div v-if="loading">数据加载中....</div>

      <h3>mock data</h3>
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item.name }} -- {{ item.email }}</li>
      </ul>

      <h3>dev data</h3>
      <ul>
        <li v-for="(item, index) in list2" :key="index">{{ item.name }} -- {{ item.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDark, useToggle, useFetch } from "@vueuse/core";
import { useRequest } from "vue-request";
import { MODE } from "@/constants";
import { api } from "@/services";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const count = ref(0);
    const { t } = useI18n();
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const { data, loading } = useRequest(api.getUsers());

    const list = computed(() => data.value?.data.list || []);

    const list2 = computed(() => data.value?.data || []);

    const title = t("demo.user.info");

    return {
      count,
      toggleDark,
      isDark,
      list,
      list2,
      loading,
      title,
      MODE,
    };
  },
});
</script>

<style scoped lang="scss">
.box {
  @apply flex flex-col;
}
.btn {
  @apply px-4 py-1 rounded inline-block
    bg-teal-600 text-white cursor-pointer
    hover:bg-teal-700
    disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50;
}
</style>
