import {
  registerMicroApps, // 注册子应用方法
  setDefaultMountApp, // 设默认启用的子应用
  runAfterFirstMounted, // 有个子应用加载完毕回调
  start, // 启动 qiankun
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  initGlobalState, // 官方应用间通信
} from "qiankun";

// 导入主应用
import render, { pathPrefix } from "@/micro/vue-render";

/**
 * Step1 初始化应用
 */
// @ts-ignore
render({ loading: true });

// @ts-ignore
const loader = loading => render({ loading });

let msg = {
  data: "来在基座发出的消息"
}

/**
 * Step2 注册子应用
 */
const apps = [
  {
    name: 'app1',
    entry: '//localhost:9001',
    container: '#subapp-viewport',
    loader,
    activeRule: pathPrefix('/app1'),
    props: msg,
  },
  {
    name: 'app2',
    entry: '//localhost:9002',
    container: '#subapp-viewport',
    loader,
    activeRule: pathPrefix('/app2'),
    props: msg,
  }
];
registerMicroApps(
  apps,
  {
    // 挂载前的回调
    beforeLoad: [
      // @ts-ignore
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    // 挂载后的回调
    beforeMount: [
      // @ts-ignore
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    // 卸载后的回调
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
start({
  // 渲染模式由 render 模式 改为 container
  sandbox: { strictStyleIsolation: true }
})

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
