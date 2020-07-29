<template>
  <div class="page-container page-my">
    <van-nav-bar title="我的" fixed placeholder>
      <template #right>
        <ui-icon icon-class="message" class="xl" @click="onMessageClick"/>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-cell-group>
        <van-cell title="登录" is-link @click="onLoginClick" />
        <van-cell title="设置" is-link @click="onSettingsClick" />
      </van-cell-group>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {PullRefresh, Cell, CellGroup} from "vant";

@Component({
  components: {
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
})
export default class My extends Vue {
  @Prop({type: Boolean, default: false})
  private refreshing: boolean | undefined;

  private onRefresh() {
    setTimeout(() => {
      this.refreshing = false;
    }, 1000);
  }

  private onSettingsClick() {
    this.$router.push({
      name: "setting",
      params: {
        routerType: "push"
      }
    });
  }

  private onLoginClick() {
    this.$router.push({
      name: "login",
      params: {
        routerType: "push"
      }
    });
  }
  private onMessageClick() {
    this.$router.push({
      name: "message",
      params: {
        routerType: "push"
      }
    });
  }
}
</script>
<style scoped lang="scss">
.page-my {
}
</style>
