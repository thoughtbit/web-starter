<template>
  <div class="feeds waterfall">
    <div v-for="item in list" :key="item.id" class="feed-item">
      <div class="goods">
        <div class="goods-cover">
          <img :src="item.pic" alt="" />
        </div>
        <div class="goods-info">
          <p class="goods-name">{{ item.name }}</p>
          <p class="goods_price">¥ {{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const list = ref([
  {
    id: 1,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 2,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 3,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 4,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 5,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 6,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 7,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 8,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 9,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
  {
    id: 10,
    name: "SK-II神仙水230ml+小灯泡30ml+大红瓶面霜80g护肤品套装(含清莹露+洗面奶+面膜+眼霜)sk2生日礼物sk-ii",
    pic: "https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/190882/38/21801/149697/62500079E1eed95f7/d7a92fd5d878ea44.jpg!q70.dpg.webp",
    price: 200,
  },
]);
</script>

<style lang="scss" scoped>
.feeds {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .feed-item {
    width: 50%;
    margin-bottom: 10px;
    .goods {
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    &:nth-child(1n) {
      padding-right: 5px;
    }
    &:nth-child(2n) {
      padding-left: 5px;
    }
  }
}
</style>
