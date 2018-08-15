<template>
  <div class="page-status">
    <img :src="imgUrl" alt="">
    <p v-html="describe"></p>
    <md-button
      v-if="button.text"
      @click="button.handler">
      {button.text}
      </md-button>
  </div>
</template>

<script>

import { Button } from 'mand-mobile';

export default {
  name: 'page-status',
  components: {
    [Button.name]: Button,
  },
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    describe: {
      type: String,
      default: '',
    },
    button: {
      type: Object,
      default() {
        return {
          text: '',
          handler: '',
        };
      },
    },
  },
};

/*
 <page-status
    imgUrl="http://manhattan.didistatic.com/static/manhattan/mfd/result-page/network"
    :describe="空空如也，白天，晚上，冬夜"
    :button="{
      text: '操作',
      handler () {
        $router.replace('/page')
      }
    }"
  ></page-status>
 */
</script>

<style lang="stylus">
.page-status {
  width: 300px;
  margin: 0 auto;
  img {
    width: 100px;
    margin-left: 100px;
    filter: grayscale(100%);
    opacity: .5;
  }
  p {
    margin-top: 20px;
    font-size: 16px;
    color: #ccc;
    text-align: center;
  }
}
</style>
