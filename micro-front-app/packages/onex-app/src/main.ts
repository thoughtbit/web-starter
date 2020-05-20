import {
  registerMicroApps, // 注册子应用方法
  setDefaultMountApp, // 设默认启用的子应用
  runAfterFirstMounted, // 有个子应用加载完毕回调
  start, // 启动 qiankun
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  initGlobalState, // 官方应用间通信
} from "qiankun";

import "@/assets/styles/index.scss";

// 插件集合
import "@/plugins";

// 导入主应用
import render from "@/render/vue-render";

/**
 * Step1 初始化应用
 */
// @ts-ignore
render({ loading: true });

// @ts-ignore
const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'app1',
      entry: '//localhost:9001',
      container: '#subapp-viewport',
      loader,
      activeRule: '/app1',
    },
    {
      name: 'app2',
      entry: '//localhost:9002',
      container: '#subapp-viewport',
      loader,
      activeRule: '/app2',
    }
  ],
  {
    beforeLoad: [
      // @ts-ignore
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      // @ts-ignore
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      // @ts-ignore
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  }
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/app1');

/**
 * Step4 启动微服务
 */
start();

// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});

// 设置全局未捕获一场处理器
addGlobalUncaughtErrorHandler(event => console.log(event));
