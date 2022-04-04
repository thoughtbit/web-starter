import { defineStore } from "pinia";
import StorageManager, { USER_INFO_KEY } from "@/services/storage";
import { api } from "@/services";
import { setToken, clearToken } from "@/utils/auth";
import type { UserState, UserInfo } from "./types";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    users: [],
    userInfo: undefined,
    token: undefined,
    role: "",
  }),
  getters: {
    getUserInfo(state) {
      return state.userInfo || {};
    },
    getToken(state): string {
      return state.token || "";
    },

    // getter只是在幕后的计算属性，因此不能向其传递任何参数。但是你可以从getter返回一个函数来接收任何参数。使用: {{getUserById(1)}}
    getUserById(state) {
      return (userId: string | number) => state.users.find((user: UserInfo) => user.userId === userId);
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ?? "";
    },

    setUser(partial: Partial<UserState>) {
      // 批量更新
      this.$patch(partial);
    },

    // setUserInfo(user: UserInfo | null) {
    //   this.userInfo = user;
    // },
    setUserInfo(partial: UserInfo) {
      // 批量更新
      this.$patch((state: UserState) => {
        state.userInfo = partial;
      });
    },

    async login(params: any): Promise<any> {
      const data = api
        .login(params)
        .then((res: any) => {
          StorageManager.set(USER_INFO_KEY, res);
          this.setUserInfo(res);
          setToken(res.token);
          this.setToken(res.token);
        })
        .catch((error: any) => {
          clearToken();
          return error;
        });
    },

    async getUsers() {
      const data = await api
        .getUsers()
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });

      return data;
    },
    async getUsersById(params: { id: number }) {
      const data = await api
        .getUserById(params.id)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });

      return data;
    },

    async logout() {
      await api.logout();

      // this.$patch({
      //   users: [],
      //   userInfo: null,
      //   token: "",
      // });
      this.$reset();

      clearToken();
    },
  },

  // 开启数据缓存
  persist: true,
});
