<template>
  <div class="page">
    <header class="page-header">
      <h1 class="logo">某某应用</h1>
    </header>
    <main class="page-main">
      <div class="banner">banner</div>
      <nav class="main-nav">
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航1</strong>
        </a>
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航2</strong>
        </a>
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航3</strong>
        </a>
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航4</strong>
        </a>
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航5</strong>
        </a>
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航6</strong>
        </a>
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航7</strong>
        </a>
        <a class="nav-link">
          <img
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg"
            alt=""
          />
          <strong class="name">导航8</strong>
        </a>
      </nav>
      <div class="banner">banner</div>
      <div ref="target">
        <AsyncComponent v-if="targetIsVisible" />
      </div>
    </main>
    <footer class="page-footer">
      <p class="text-center">版权</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const AsyncComponent = defineAsyncComponent(() => import("./components/goods-list.vue"));

const target = ref(null);
const targetIsVisible = ref(false);

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    targetIsVisible.value = true;
  }
});
</script>

<style lang="scss" scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  &-header {
    background-color: #ff233b;
    padding: 10px 20px;
    .logo {
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
    }
  }
  &-main {
    .banner {
      height: 280px;
      line-height: 280px;
      background-color: #f5f5f5;
      text-align: center;
    }
    .main-nav {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 0;

      .nav-link {
        width: 20%;
        padding: 5px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img {
          width: 36px;
          margin-bottom: 5px;
        }
        .name {
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }
  &-footer {
    padding: 15px 0;
  }
}
</style>
