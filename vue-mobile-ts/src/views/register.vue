<template>
  <div class="page-container page-login">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      title="注册"
      fixed
      placeholder
    >
    </van-nav-bar>
    <van-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      @refresh="onRefresh"
    >


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
export default class Login extends Vue {
  @Prop({type: Boolean, default: false})
  private refreshing: boolean | undefined;

  private onRefresh() {
    setTimeout(() => {
      this.refreshing = false;
    }, 1000);
  }

  private onClickLeft() {
    this.$router.go(-1);
  }
}
</script>
<style scoped lang="scss">
.page-login {
}
</style>
