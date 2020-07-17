<template>
  <div class="page-container page-home" @scroll="onScrollChange" ref="home">
    <ui-navbar
      :isShowBack="false"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :navBarStyle="navBarStyle"
    >
      <template #left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="菜单" />
      </template>
      <template #center>
        <van-search
          v-model="searchText"
          placeholder="请输入搜索关键词"
          shape="round"
          :background="navBarCurrentSlotStyle.search.bgColor"
        >
        </van-search>
      </template>
      <template #right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="消息" />
      </template>
    </ui-navbar>
    <home-swiper :swiperImgs="images" height="218px" />
    <ui-whitespace />
    <van-notice-bar left-icon="volume-o" :scrollable="false" mode="link">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item>1. 技术是开发它的人的共同灵魂技术是开发它的人的共同灵魂</van-swipe-item>
        <van-swipe-item>2. 技术是开发它的人的共同灵魂技术是开发它的人的共同灵魂</van-swipe-item>
        <van-swipe-item>3. 技术是开发它的人的共同灵魂技术是开发它的人的共同灵魂</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <ui-whitespace />
    <van-notice-bar left-icon="volume-o" mode="link">
      技术是开发它的人的共同灵魂技术是开发它的人的共同灵魂
    </van-notice-bar>
    <ui-whitespace />
    <service-nav />
    <ui-whitespace />
    <service-category />
    <ui-whitespace />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Search, NoticeBar, Swipe, SwipeItem } from "vant";
import Header from "@/components/ui-header.vue";
import HomeSwiper from "@/views/components/swiper/home-swiper.vue";
import ServiceNav from "@/views/components/service-nav.vue";
import ServiceCategory from "@/views/components/service-category.vue";

@Component({
  components: {
    HomeSwiper,
    Header,
    ServiceNav,
    ServiceCategory,
    [Search.name]: Search,
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
})
export default class extends Vue {
  private searchText = "";

  // NavBar 插槽的样式数据，包含页面未开始滑动的时候插槽的样式 (默认样式)
  // 和 页面滑动到锚定点之后的插槽的样式（高亮样式）
  private navBarSlotStyle = {
    // 默认样式
    normal: {
      // 左侧插槽
      leftIcon: require("@/assets/images/icons/more-white.svg"),
      // 中间插槽
      search: {
        bgColor: "transparent"
      },
      // 右侧插槽
      rightIcon: require("@/assets/images/icons/message-white.svg")
    },
    // 高亮样式
    highlight: {
      // 左侧插槽
      leftIcon: require("@/assets/images/icons/more.svg"),
      // 中间插槽
      search: {
        bgColor: "##fff"
      },
      // 右侧插槽
      rightIcon: require("@/assets/images/icons/message.svg")
    }
  };
  // NavBar 当前使用的插槽样式
  private navBarCurrentSlotStyle = {};

  // NavBar 定制样式
  private navBarStyle = {
    position: "fixed",
    backgroundColor: ""
  };

  // 记录页面滚动值
  private scrollTopValue = -1;
  // 锚点值
  private ANCHOR_SCROLL_TOP = 180;

  private images = [
    {
      href:
        "https://www.2021shaanxi.com/html/static/assets/images/banner/banner_1.jpg",
      link: "https://www.baidu.com?s=1"
    },
    {
      href:
        "https://www.2021shaanxi.com/html/static/assets/images/banner/banner_2.jpg",
      link: "https://www.baidu.com?s=2"
    },
    {
      href:
        "https://www.2021shaanxi.com/html/static/assets/images/banner/banner_1.jpg",
      link: "https://www.baidu.com?s=3"
    },
    {
      href:
        "https://www.2021shaanxi.com/html/static/assets/images/banner/banner_2.jpg",
      link: "https://www.baidu.com?s=4"
    }
  ];

  private created() {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
  }

  /**
   * keepAlive 组件被激活的时候调用
   * 去为滑动模块指定滑动距离。
   */
  private activated() {
    this.$refs.home.scrollTop = this.scrollTopValue;
  }

  /**
   * 监听页面滚动
   * 1、获取到当前页面滚动的距离
   * 2、计算 NavBar 背景颜色（NavBar 背景透明度）当前滚动的距离 / 锚点值 = NavBar 背景透明度  opacity
   * 3、opacity >= 1 ， 当前滚动的距离 已经等于或者超过了 锚点值，当前 NavBar 插槽的样式变为 高亮状态的样式。
   *  否则的话 opacity < 1 ,当前 NavBar 插槽的样式，为 默认状态的样式
   */
  private onScrollChange($event) {
    // 获取当前页面滚动的距离
    this.scrollTopValue = $event.target.scrollTop;
    // 计算NavBar 背景透明度
    const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
    // 指定NavBar 插槽样式
    if (opacity >= 1) {
      this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
    } else {
      this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
    }

    // 根据透明比例来设置 NavBar 的背景色
    this.navBarStyle.backgroundColor = "rgba(255, 255, 255, " + opacity + ")";
  }

  private onClickLeft() {
    this.$toast("Back");
  }
  private onClickRight() {
    this.$toast("Button");
  }
}
</script>
<style lang="scss">
.page-home {
  overflow: hidden;
  overflow-y: auto;
  .van-search {
    width: 100%;
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
</style>
