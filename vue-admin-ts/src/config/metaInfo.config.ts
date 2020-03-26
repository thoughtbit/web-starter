import { MetaInfo } from "vue-meta";

// App.vue
export const MetaInfoApp = Object.freeze<MetaInfo>({
  title: "入口页",
  titleTemplate: "%s | 大数据统一管理平台"
});

// Home.vue
export const MetaInfoHome = Object.freeze<MetaInfo>({
  title: "首页",
  titleTemplate: "%s | 大数据统一管理平台",
  meta: [
    {
      name: "keywords",
      content: "首页, 大数据统一管理平台"
    },
    {
      name: "description",
      content: "大数据统一管理平台"
    },
    {
      name: "author",
      content: "moocss"
    }
  ]
});

// common/410.vue
export const MetaInfo404 = Object.freeze<MetaInfo>({
  title: "404 找不到页面",
  titleTemplate: "%s | 大数据统一管理平台",
  meta: [
    {
      name: "keywords",
      content: "404, 大数据统一管理平台"
    },
    {
      name: "description",
      content: "找不到页面"
    },
    {
      name: "author",
      content: "moocss"
    }
  ]
});

// common/410.vue
export const MetaInfo401 = Object.freeze<MetaInfo>({
  title: "401 无权限访问页面",
  titleTemplate: "%s | 大数据统一管理平台",
  meta: [
    {
      name: "keywords",
      content: "401, 大数据统一管理平台"
    },
    {
      name: "description",
      content: "无权限访问页面"
    },
    {
      name: "author",
      content: "moocss"
    }
  ]
});

export const MetaInfoError = Object.freeze<MetaInfo>({
  title: "错误页面",
  titleTemplate: "%s | 大数据统一管理平台",
  meta: [
    {
      name: "keywords",
      content: "页面出错了, 大数据统一管理平台"
    },
    {
      name: "description",
      content: "页面出错了"
    },
    {
      name: "author",
      content: "moocss"
    }
  ]
});

