import mpx from '@mpxjs/core';
import storage, { TOKEN_KEY, OPEN_ID_KEY } from './storage';
import { wxLogin } from './wxapi';
import { post } from './request';
import { LOGIN_URL } from './../config/index';

// 微信用户登录, 在App onLaunch 中使用
export async function autoLogin() {
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  const loginResp = await wxLogin().catch(() => {
    mpx.showToast({
      title: '微信登录失败',
      icon: 'error',
    });
  });

  if (loginResp?.code) {
    // 保存微信code
    await storage.set(OPEN_ID_KEY, loginResp.code);

    return post(LOGIN_URL, {
      openId: loginResp.code,
    })
      .then((res: any) => {
        console.log('1. wxlogin:', res);

        // console.log('ok:', res);
        const { token } = res.data;
        // console.log('token:', token);
        storage.set(TOKEN_KEY, token);
      })
      .catch(() => {
        storage.remove(TOKEN_KEY);
      });
  } else {
    storage.remove(OPEN_ID_KEY);
  }
}

// 手动调用微信用户登录
export async function onLogin() {
  mpx.showLoading({
    title: '正在登录中...',
    mask: true,
  });
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  const loginResp = await wxLogin().catch(() => {
    mpx.showToast({
      title: '微信登录失败',
      icon: 'error',
    });
  });
  // console.log('mpx.login: ', loginResp);
  // openId
  // console.log('mpx.login.code: ', loginResp.code);

  if (loginResp?.code) {
    // 保存微信code
    await storage.set(OPEN_ID_KEY, loginResp.code);

    await post(LOGIN_URL, loginResp)
      .then((res: any) => {
        // 成功
        const { token } = res;
        storage.set(TOKEN_KEY, token);

        mpx.navigateTo({
          url: '../../pages/index/index',
        });
      })
      .catch(() => {
        storage.remove(TOKEN_KEY);
      })
      .finally(() => {
        mpx.hideLoading();
      });
  } else {
    mpx.hideLoading();

    storage.remove(OPEN_ID_KEY);
  }
}

// 检查微信登录态是否过期
export function checkSession() {
  return new Promise(function (resolve, reject) {
    mpx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      },
    });
  });
}

// 判断用户是否登录
export function checkLogin() {
  return new Promise(function (resolve, reject) {
    const accessToken = storage.get(TOKEN_KEY);
    if (accessToken) {
      checkSession()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    } else {
      reject(false);
    }
  });
}
