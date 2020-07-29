<template>

    <van-tabs
      sticky
      offset-top="42px"
      color="#dd1a21"
      title-active-color="#dd1a21"
      line-height="2px"
      title-inactive-color="#333333"
      v-model="active"
      class="sc-tabs"
    >
      <van-tab :title="item" v-for="(item, index) in tabArray" :key="index">
        <Recommend v-if="item === '推荐'"></Recommend>
        <div v-else>{{ item }}</div>
      </van-tab>
    </van-tabs>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {State} from "vuex-class";
import {Tab, Tabs} from "vant";
import Recommend from "@/views/components/recommend.vue";

@Component({
  components: {
    Recommend,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
})
export default class ServiceCategory extends Vue {
  @State('tabArray') private tabArray: any;

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private list!: any;

  private active = 0;
}
</script>
<style lang="scss">
.sc-tabs {
  .van-tab__pane-body {
    height: 1000px;
    background-color: #fff;
  }
  .van-sticky--fixed {
    top: 68px !important;
  }
}
</style>
