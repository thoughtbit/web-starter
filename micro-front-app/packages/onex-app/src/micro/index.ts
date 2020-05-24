import {
  registerMicroApps, // 注册子应用方法
  setDefaultMountApp, // 设默认启用的子应用
  runAfterFirstMounted, // 有个子应用加载完毕回调
  start, // 启动 qiankun
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  initGlobalState, // 官方应用间通信
} from "qiankun";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import getApps from "@/micro/apps";
import render from "@/micro/vue-render";
import shared from "@/shared";

// @ts-ignore
render({ loading: true });

// @ts-ignore
const loader = loading => render({ loading });

const props = {
  shared
}
const apps = getApps(props, loader);
registerMicroApps(apps, {
  // 挂载前的回调
  beforeLoad: (app: any) => {
    NProgress.start();
    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
    return Promise.resolve();
  },
  // 挂载后的回调
  beforeMount: [
    // @ts-ignore
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  // 卸载后的回调
  afterMount: (app: any) => {
    NProgress.done();
    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    return Promise.resolve();
  },
});

// 初始化全局状态
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) =>
  console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

// setDefaultMountApp('/app1');

start();

// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});

// 设置全局未捕获一场处理器
addGlobalUncaughtErrorHandler((event: Event | string) => {
  console.error("全局未捕获异常: ", event);
  const { message: msg } = event as any;
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    console.error("子应用加载失败，请检查应用是否可运行");
  }
});
