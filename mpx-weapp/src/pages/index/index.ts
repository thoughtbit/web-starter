import mpx, { createPage, reactive } from '@mpxjs/core';
import { MODE, DEBUG } from '@/config';
import subPackageIndexPage from '../../subpackage/pages/index/index.mpx?resolve';
const globalData = getApp().globalData;

createPage({
  data: {
    statusBarHeight: 0,
    avatarURL: '',
  },
  onLoad() {
    console.log('onLoad: 监听页面加载');

    console.log('globalData:', globalData);

    if (globalData.systemInfo) {
      this.setData({
        statusBarHeight: globalData.systemInfo.statusBarHeight,
      });
    }

    console.log('MODE:', MODE);
    console.log('DEBUG:', DEBUG);
  },
  onReady() {
    console.log('onReady: 监听页面初次渲染完成');
  },
  onShow() {
    console.log('onShow: 监听页面显示');
  },
  onHide() {
    console.log('onHide: 监听页面隐藏');
  },
  onUnload() {
    console.log('onUnload: 监听页面卸载');
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh: 监听用户下拉动作');
  },
  onReachBottom() {
    console.log('onReachBottom: 页面上拉触底事件的处理函数');
  },

  onLogin() {
    mpx.navigateTo({
      url: '../../pages/login/index',
    });
  },

  onWxLogin() {
    mpx
      .showToast({ title: '登录成功', icon: 'success', duration: 2000 })
      .then((res: any) => {
        console.log(res);
        mpx.navigateTo({
          url: '../../pages/login/index',
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  },
  onDemo() {
    mpx.navigateTo({
      url: '../../pages/demos/index',
    });
  },
  handleTap() {
    mpx.navigateTo({
      url: subPackageIndexPage,
    });
  },
  setup() {
    const systemInfo = reactive({
      statusBarHeight: 0,
    });
    systemInfo.statusBarHeight = globalData.systemInfo.statusBarHeight;

    return {
      systemInfo,
    };
  },
});
