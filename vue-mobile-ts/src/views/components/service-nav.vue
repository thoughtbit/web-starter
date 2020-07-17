<template>
  <van-grid square>
    <van-grid-item>
      <template #icon>
        <ui-icon icon-class="menu" class="xl" />
      </template>
      <template #text>
        <span class="van-grid-item__text">首页</span>
      </template>
    </van-grid-item>
    <van-grid-item icon="home-o" text="文字" dot />
    <van-grid-item icon="home-o" text="文字" />
    <van-grid-item icon="home-o" text="文字" />
    <van-grid-item icon="search" text="文字" />
    <van-grid-item icon="search" text="文字" badge="99+" />
    <van-grid-item icon="home-o" text="文字" />
    <van-grid-item icon="home-o" text="文字" />
    <van-grid-item icon="home-o" text="文字" />
    <van-grid-item icon="home-o" text="文字" dot />
    <van-grid-item icon="search" text="文字" badge="99+" />
    <van-grid-item icon="home-o" text="全部" />
  </van-grid>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Swipe, SwipeItem, Grid, GridItem } from "vant";

@Component({
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
})
export default class ServiceNav extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private list!: any;
}
</script>
<style scoped lang="scss"></style>
