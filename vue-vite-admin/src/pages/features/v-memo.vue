<template>
  <h1>v-memo 渲染视图缓存</h1>
  <input type="text" name="animal" v-model="animal" />

  <!-- 如果 memo 中的数组项 发生了变化才会重新渲染-->
  <ul class="list" v-memo="[shouldUpdate]">
    <li v-for="(item, index) in list" :key="index" class="item">
      {{ item }} : {{ animal }} ==> {{ animalType[animal] }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const list = new Array(10000);
const animalType = {
  cow: "🐂",
  horse: "🐎",
  sheep: "🐑",
};

const animal = ref("cow");

const shouldUpdate = ref(0);

watch(animal, () => {
  if (Object.keys(animalType).includes(animal.value)) {
    // eslint-disable-next-line no-plusplus
    shouldUpdate.value++;
  }
});
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #000;
  width: 100%;
}
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .item {
    padding: 10px;
    margin: 0 10px 10px;
    border: 1px solid #eee;
  }
}
</style>
