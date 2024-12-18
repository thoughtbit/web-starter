<template>
  <h1>敏感词替换: "SB", "sb", "av"</h1>

  <input type="text" name="keyword" v-model="msg" />
</template>

<script setup lang="ts">
import { customRef } from "vue";

const replaceStr = (str: any) => {
  const list = ["SB", "sb", "av"];
  list.forEach((keyword) => {
    str = str.replace(keyword, "***");
  });

  return str;
};

const useReplaceRef = (value: any) => {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        console.log("数据被访问了");
        return value;
      },
      set(newValue) {
        console.log("数据被修改了");
        value = replaceStr(newValue);
        trigger();
      },
    };
  });
};

const msg = useReplaceRef("输入敏感信息, 看被替换了没有");
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #000;
  width: 100%;
}
</style>
