import { defineStore } from '@mpxjs/pinia';
import mpx from '@mpxjs/core';
import type { UserInfo, UserState } from './types';
import storage, { TOKEN_KEY } from '@/utils/storage';
import { post } from '@/utils/request';
import { LOGIN_URL } from '@/config';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLogin: false,
    userInfo: null,
  }),
  getters: {
    getUserInfo: (state) => {
      return state.userInfo ?? {};
    },
  },
  actions: {
    setUserInfo(partial: UserInfo) {
      // 批量更新
      this.$patch((state) => {
        state.userInfo = partial;
      });
    },
    resetUserInfo() {
      this.$reset();
    },
    logout() {
      this.$patch({
        isLogin: false,
        userInfo: {},
      });
    },
    login() {
      mpx.showLoading({
        title: '正在登录中...',
        mask: true,
      });
      post(LOGIN_URL, { openId: '1234' })
        .then((res: any) => {
          // 成功
          const { token, userInfo } = res;
          storage.set(TOKEN_KEY, token);
          if (token) {
            this.$patch({
              isLogin: true,
              userInfo,
            });
          }

          // mpx.navigateTo({
          //   url: '../../pages/index/index',
          // });
        })
        .catch(() => {
          storage.remove(TOKEN_KEY);
        })
        .finally(() => {
          mpx.hideLoading();
        });
    },
  },
});
