import mpx, { createApp } from '@mpxjs/core';
import apiProxy from '@mpxjs/api-proxy';
import { setupStore } from './stores';
import { autoLogin } from './utils/auth';
import { getUserInfo } from './utils/wxapi';

(() => {
  // 各个平台之间 api 进行转换
  mpx.use(apiProxy, { usePromise: true });

  // 注册全局状态
  setupStore(mpx);
})();

createApp({
  data: {},
  globalData: {
    systemInfo: {},
    userInfo: {},
    networkType: '',
    isConnected: true,
  },

  async onLaunch() {
    this.getSystemInfo();

    // 获取网络类型
    await mpx.getNetworkType({
      success: (value) => {
        const { networkType } = value;
        this.globalData.networkType = networkType;
        if (networkType === 'none') {
          this.globalData.isConnected = false;
          mpx.showToast({
            title: '当前无网络',
            icon: 'error',
            duration: 2000,
          });
        } else {
          this.globalData.isConnected = true;
          console.log('网路类型:', networkType);
        }
      },
    });

    await autoLogin();

    // 获取匿名用户信息, 放到globalData.userInfo
    await getUserInfo().then((res) => {
      this.globalData.userInfo = res.userInfo;
    });
  },
  async onShow() {
    // 监听网络状态变化事件
    await mpx.onNetworkStatusChange((value) => {
      const { isConnected, networkType } = value;
      console.log('网络类型:', networkType);
      console.log('网络状态:', isConnected);
      this.globalData.networkType = networkType;
      this.globalData.isConnected = isConnected;
      if (!isConnected) {
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
        });
      } else {
        wx.hideToast();
      }
    });

    await mpx.onMemoryWarning(function () {
      console.log('内存告警');
    });
  },
  // 设置 globalData.userInfo 信息
  setUserInfo(userInfo: any): any {
    this.globalData.userInfo = userInfo;
  },
  getSystemInfo() {
    // 获取系统信息
    const systemInfo = mpx.getSystemInfoSync();
    // console.log('getSystemInfoSync:', systemInfo);
    // 获取胶囊按钮位置信息
    const getMenuInfo = mpx.getMenuButtonBoundingClientRect();

    this.globalData.systemInfo = {
      statusBarHeight: systemInfo.statusBarHeight,
      navBarHeight:
        (getMenuInfo.top - systemInfo.statusBarHeight) * 2 + getMenuInfo.height + systemInfo.statusBarHeight,
      menuRight: systemInfo.screenWidth - getMenuInfo.right,
      menuTop: getMenuInfo.top - systemInfo.statusBarHeight,
      menuHeight: getMenuInfo.height,

      screenHeight: systemInfo.screenHeight,
      screenWidth: systemInfo.screenWidth,
      platform: systemInfo.platform,
    };
  },
});
