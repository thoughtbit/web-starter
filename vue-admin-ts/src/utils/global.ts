import dayjs from "dayjs";
import { VueConstructor } from "vue";
import router from "@/router";
import rules from "./rules";
import enums from "./enums";
import { encodeUnicode, decodeUnicode, emojiString } from "./emoji";

export default {
  install(Vue: VueConstructor, options = {}) {
    /** 路由跳转
     * @method $routerLink
     * @param {path：路径，type：类型(list：列表，edit:修改，save：新增)，queryParams：请求参数}
     */

    // @ts-ignore
    Vue.prototype.$routerLink = function(path, type, queryParams, moduleId = 0) {
      let params = {
        type: type
      };
      params = Object.assign(params, queryParams);
      // 路由
      router.push({ path: path, query: params });
    };

    /** 时间戳转换
     * @method $dateFormat
     * @param {time：时间戳，format：转换格式}
     */
    Vue.prototype.$dateFormat = (dataStr: any, pattern: string = "YYYY-MM-DD HH:mm:ss") => {
      return dayjs(dataStr).format(pattern);
    };

    /** 微信图片渲染
     * @method $weChatUrl
     * @param {url：图片路径}
     */
    Vue.prototype.$weChatUrl = (url: string) => {
      if (url && url.indexOf("mmbiz.") > -1) {
        const base = process.env.VUE_APP_BASE_API;
        return `${base}/common/loadingImage?imageUrl=${url}`;
      } else {
        return url;
      }
    };
    Vue.prototype.$showEmojiName = (str: string) => {
      // 处理显示emoji昵称
      let name = decodeUnicode(str);
      name = emojiString(name);
      return name;
    };
    Vue.prototype.$emojiCodeName = (str: string) => {
      // 处理显示emoji昵称
      return encodeUnicode(str);
    };
    Vue.prototype.$rules = rules;
    Vue.prototype.$enums = enums;
    /** 时间字符串
     * @method $getDateDiff
     * @param {timespan：时间戳}
     */
    Vue.prototype.$getDateDiff = function(timespan: number) {
      const dateTime = new Date(timespan);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const day = dateTime.getDate();
      const hour = dateTime.getHours();
      const minute = dateTime.getMinutes();
      // var second = dateTime.getSeconds()
      const now = new Date();
      const nowNew = now.getTime(); // typescript转换写法
      let milliseconds = 0;
      let timeSpanStr;
      milliseconds = nowNew - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = "刚刚";
      } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60)) + "分钟前";
      } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + "小时前";
      } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 3) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + "天前";
      } else if (milliseconds > 1000 * 60 * 60 * 24 * 3 && year === now.getFullYear()) {
        timeSpanStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
      } else {
        timeSpanStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
      }
      return timeSpanStr;
    };

    /** 当前地址ip
     * @method $path
     * @param {}
     */
    Vue.prototype.$path = process.env.VUE_APP_BASE_API;

    /** 当前地址ip
     * @method $getPath
     * @param {url: 路径}
     */
    Vue.prototype.$getPath = function(url: string) {
      const base = process.env.VUE_APP_BASE_API;
      if (/^http/.test(url)) return url;
      return base + url;
    };
    /** 是否开发模式
     * @method $env
     * @param {}
     */
    Vue.prototype.$env = process.env.VUE_APP_ENV;

    /** 导出，下载处理文件流
     * @method $exportClick
     * @param {res：文件流，name ： 下载文件名}
     */
    Vue.prototype.$exportClick = function(res: any, name:string = "下载.zip") {
      const content = res;
      const blob = new Blob([content]);
      const fileName = name;
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
    };

    /** 当res.code === 200 时
     * @method $restBack
     * @param {res：回调参数，fn ： 成功后回调函数，message：成功提示，type：提示类型}
     */
    Vue.prototype.$restBack = function(res: any, fn: () => void, message: string = "操作成功", type: string = "success") {
      if (res.code === 200) {
        this.$message({
          message: message || res.message,
          type: type
        });
        fn();
      }
    };
  }
};
