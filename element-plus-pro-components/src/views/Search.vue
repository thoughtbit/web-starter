<template>
  <div class="search">
    <UIInput
      v-model="username"
      placeholder="请输入姓名"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      :allow-clear="true"
      :disabled="false"
    >
      <template #suffix>
        <button type="button" @click="onSearch">搜索</button>
      </template>
    </UIInput>
    <ul>
      <li v-for="key in Object.keys(params)" :key="key">{{ key }}={{ params[key] }}</li>
    </ul>
    <hr />
    <ul>
      <li v-for="(item, index) in filtered" :key="index">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import _ from "lodash";
import { useUrlSearchParams } from "@vueuse/core";

import { UIInput } from "./vmodel";

const username = ref("admin");
const data = ref([
  {
    id: 100,
    name: "moocss",
  },
  {
    id: 101,
    name: "liming",
  },
  {
    id: 103,
    name: "zhangming",
  },
  {
    id: 104,
    name: "kami",
  },
  {
    id: 105,
    name: "lingna",
  },
]);

const params = useUrlSearchParams("history") as Record<string, any>;
console.log("params:", params);
params.key = username.value || "";

// 使用 _.debounce 处理用户输入，300ms 后才执行
const handleSearch = _.debounce((evt) => {
  // window.history.pushState(
  //   {},
  //   "",
  //   `${window.location.pathname}?key=${evt.target.value}`,
  // );
  params.key = evt.target.value;
}, 300);

const filtered = computed(() => {
  return data.value.filter((item) => item.name.toLowerCase().includes(params.key.toLowerCase()));
});

const onInput = (event: InputEvent) => {
  // console.log("input: ", event);
  handleSearch(event);
};
const onBlur = () => {
  console.log("blur: ");
};
const onFocus = (event: FocusEvent) => {
  console.log("focus: ", event);
};

const onSearch = () => {
  console.log("search");
};

// watch(
//   () => params.key,
//   (val, prevVal) => {
//     console.log("key: ", val);
//   }
// )
</script>

<style scoped lang="scss">
.search {
  button {
    padding: 0 20px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #eee;
    cursor: pointer;
    &:hover {
      background-color: #3022f0;
      color: #fff;
    }
  }
}
</style>
