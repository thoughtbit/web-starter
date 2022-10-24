import mpx from '@mpxjs/core';

export default () => {
  // 检测新版本
  if (mpx.canIUse('getUpdateManager')) {
    setTimeout(() => {
      const updateManager = mpx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        console.log('是否有新版本:', res.hasUpdate);
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            mpx.showModal({
              title: '更新提示',
              content: '检测到新版本, 是否下载新版本并重启小程序?',
              success: (res) => {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(() => {
            mpx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            });
          });
        }
      });
    }, 3000);
  } else {
    mpx.showModal({
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
    });
  }
};
