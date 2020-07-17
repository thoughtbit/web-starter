<template>
  <swiper
    ref="mySwiper"
    class="home-swiper"
    :options="swiperOptions"
    @clickSlide="handleSwiperSlideClick"
  >
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <div
        class="swiper-slide-img" :data-link="item.link"
        :style="{backgroundImage: 'url(' + item.href + ')', height: height}"
      ></div>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

@Component({
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class HomeSwiper extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private swiperImgs!: any;

  // slide 高度
  @Prop({
    type: String,
    default: "auto"
  })
  private height: string | undefined;

  /**
   * 1、圆点切换
   * 2、数字
   */
  @Prop({
    type: String,
    default: "1"
  })
  private paginationType: string | undefined;

  // swiper 配置
  private swiperOptions = {
    // on: {
    //   click: this.handleSwiperClick
    // },
    // 自动滚动
    autoplay: true,
    // swiper 高度 跟随 slide 高度变化
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      // 分页器的样式
      type: "bullets",
      // 分页器内的元素，添加类名
      bulletClass: "custom-bullet-class",
      clickable: true
    }
  };

  private created() {
    this.initPaginnationLayout();
  }

  private get swiper() {
    return this.$refs.mySwiper.$swiper;
  }

  private mounted() {
    // console.log('Current Swiper instance object', this.swiper);
    // this.swiper.slideTo(1, 1000, false);
  }

  /**
   * 根据分页器类型配置对应的分页器
   */
  private initPaginnationLayout() {
    switch (this.paginationType) {
      // 圆点分页器
      case "1":
        this.swiperOptions.pagination = {
          el: ".swiper-pagination",
          // 分页器的样式
          type: "bullets",
          // 分页器内的元素，添加类名
          bulletClass: "custom-bullet-class"
        };
        break;
      // 数字分页器
      case "2":
        this.swiperOptions.pagination = {
          el: ".swiper-pagination",
          // 分页器样式(数字)
          type: "fraction"
        };
        break;
    }
  }

  private handleSwiperSlideClick(index: number, reallyIndex: number | null) {
    this.$toast(`点击了SwiperSlide: ${index}, ${reallyIndex}`);
    console.log("-------", this.swiperImgs[index].link);
  }

  // private handleSwiperClick(event: MouseEvent) {
  //   console.log("-------------->", event.target);
  // }
}
</script>
<style lang="scss">
.home-swiper {
  border-radius: 0 0 20px 20px;
  background-color: #eee;

  // 圆点分页器
  .swiper-pagination {
    bottom: 5px;
    .custom-bullet-class {
      box-sizing: border-box;
      border-radius: 20px;
      height: 6px;
      width: 6px;
      border: 1px solid #fff;
      margin: 0 4px;
      display: inline-block;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background: white;
      width: 20px;
    }
  }

  // 数字分页器
  .swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 6px 18px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    bottom: 20px;
    color: white;

    .swiper-pagination-current {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .swiper-slide-img {
    height: 100%;
    width: 100%;
    background-position: 50% 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

</style>
