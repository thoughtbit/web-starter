import { defineStore } from '@mpxjs/pinia';
// import StorageManager, { USER_INFO_KEY } from '@/utils/storage';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    userInfo: {},
  }),
  getters: {},
  actions: {},
});
