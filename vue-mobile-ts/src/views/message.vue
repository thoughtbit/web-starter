<template>
  <div class="page-container page-messages">
    <van-nav-bar title="消息" fixed placeholder />
    <van-tabs v-model="active" sticky class="mg-tabs">
      <van-tab title="选项1">
        <div class="van-tab__pane-body">
          <van-pull-refresh
            v-model="refreshing"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="选项2">
        <div class="van-tab__pane-body">
          选项2
        </div>
      </van-tab>
      <van-tab title="选项3">
        <div class="van-tab__pane-body">
          选项3
        </div>
      </van-tab>
      <van-tab title="选项4">
        <div class="van-tab__pane-body">
          选项4
        </div>
      </van-tab>
      <van-tab title="选项5">
        <div class="van-tab__pane-body">
          选项5
        </div>
      </van-tab>
      <van-tab title="选项6">
        <div class="van-tab__pane-body">
          选项6
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {List, PullRefresh, Cell, Tabs, Tab} from "vant";

@Component({
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
})
export default class Message extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private list!: any;

  @Prop({type: Boolean, default: false})
  private loading: boolean | undefined;

  @Prop({type: Boolean, default: false})
  private finished: boolean | undefined;

  @Prop({type: Boolean, default: false})
  private refreshing: boolean | undefined;

  private onLoad() {
    setTimeout(() => {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }

      for (let i = 0; i < 20; i++) {
        this.list.push(this.list.length + 1);
      }
      this.loading = false;

      if (this.list.length >= 200) {
        this.finished = true;
      }
    }, 1000);
  }

  private onRefresh() {
    // 清空列表数据
    this.finished = false;

    this.refreshing = true;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    this.loading = true;
    this.onLoad();
  }

  private active = 0;
}
</script>
<style lang="scss">
.mg-tabs {
  .van-tab__pane-body {
    height: 100%;
    background-color: #fff;
  }
  .van-sticky--fixed {
    top: 46px !important;
  }
}
</style>
