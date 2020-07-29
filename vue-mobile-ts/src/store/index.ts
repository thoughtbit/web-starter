import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabArray: [
      "推荐",
      "特惠",
      "电器",
      "母婴",
      "全球",
      "运动",
      "美食",
      "居家",
      "服饰",
      "洗护"
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
