<template>
  <div class="page-container page-projects">
    <van-nav-bar title="标题" fixed>
      <template #right>
        <ui-icon icon-class="menu" class="xl" />
      </template>
    </van-nav-bar>
    <div class="ui-navbar-placeholder"></div>
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { List, PullRefresh, Cell } from "vant";

@Component({
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell
  }
})
export default class Projects extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private list!: any;

  @Prop({ type: Boolean, default: false })
  private loading: boolean | undefined;

  @Prop({ type: Boolean, default: false })
  private finished: boolean | undefined;

  @Prop({ type: Boolean, default: false })
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
}
</script>
<style scoped lang="scss">
.page-projects {
  overflow: hidden;
  overflow-y: auto;
}
</style>
