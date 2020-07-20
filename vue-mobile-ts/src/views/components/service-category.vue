<template>
  <van-tabs v-model="active" sticky class="sc-tabs">
    <van-tab v-for="index in 8" :title="'选项 ' + index">
      <div class="van-tab__pane-body">内容 {{ index }}</div>
    </van-tab>
  </van-tabs>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {Tab, Tabs, Sticky} from "vant";

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky
  }
})
export default class ServiceCategory extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private list!: any;

  private active = 2;
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
