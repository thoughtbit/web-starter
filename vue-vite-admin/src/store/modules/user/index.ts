import { defineStore } from "pinia";
import StorageManager, { USER_INFO_KEY } from "@/services/storage";
import { api } from "@/services";
import { setToken, clearToken } from "@/utils/auth";
import type { UserState, UserInfo } from "./types";
import { removeRouteListener } from "@/utils/route-listener";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    users: [],
    userInfo: undefined,
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
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === "user" ? "admin" : "user";
        resolve(this.role);
      });
    },
    setToken(token: string | undefined) {
      this.token = token ?? "";
    },

    setUser(partial: Partial<UserState>) {
      // 批量更新
      this.$patch(partial);
    },

    resetInfo() {
      this.$reset();
    },

    // setUserInfo(user: UserInfo | null) {
    //   this.userInfo = user;
    // },
    setUserInfo(partial: UserInfo) {
      // 批量更新
      this.$patch((state) => {
        state.userInfo = partial;
      });
    },

    async login(params: any): Promise<any> {
      return await api
        .login(params)
        .then((result: any) => {
          console.log("用户登录:", result);
          const { code, data } = result;
          if (code === 0) {
            StorageManager.set(USER_INFO_KEY, data);
            this.setUserInfo(data);
            setToken(data.token);
            return result;
          } else {
            return result;
          }
        })
        .catch((error: any) => {
          clearToken();
          return error;
        });
    },

    async getUsers() {
      return await api
        .getUsers()
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return error;
        });
    },

    async getUsersById(params: { id: number }) {
      return await api
        .getUserById(params.id)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return error;
        });
    },

    async logout() {
      return await api.logout().then((result) => {
        console.log("退出登录:", result);
        // this.$patch({
        //   users: [],
        //   userInfo: null,
        //   token: "",
        // });
        this.resetInfo();

        clearToken();
        StorageManager.remove(USER_INFO_KEY);

        removeRouteListener();
      });
    },

    async register(params: any): Promise<any> {
      return await api
        .register(params)
        .then((result: any) => {
          console.log("----register--->", result);
          return result;
        })
        .catch((error: any) => {
          return error;
        });
    },
  },

  // 开启数据缓存
  persist: true,
});
