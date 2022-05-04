<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SvgIcon name="chart" color="#fff" class="icon-chart" size="28" />
    <SvgIcon name="date" color="#fa233b" />
    <SvgIcon name="lock" color="#fff" />
    <SvgIcon name="user" color="#fa233b" />
    <SvgIcon name="zip" color="#fff" />
    <hr />
    <button type="button" @click="openModal">函数对话框</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { modal } from './reader';

const dialogVisible = ref<any>(false);
const openModal = () => {
  dialogVisible.value = true;
  modal(dialogVisible);
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
