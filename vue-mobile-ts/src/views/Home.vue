<template>
  <div class="home">
    <Header msg="头部" />
    <ui-icon icon-class="account-book-outlined" class="lg" />
    <van-row class="shop-nav">
      <van-col span="6">
        <van-icon name="pending-payment" />
        <strong>待付款</strong>
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        <strong>待接单</strong>
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        <strong>待发货</strong>
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        <strong>已发货</strong>
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/ui-header.vue";
import { Row, Col, Icon, Cell, CellGroup } from "vant";
@Component({
  components: {
    Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
})
export default class extends Vue {}
</script>
