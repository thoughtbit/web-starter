import { defineStore } from "pinia";
import StorageManager, { USER_INFO_KEY } from "@/services/storage";
import { api } from "@/services";

export type UserInfo = {
  userId: string | number;
  username: string;
};
export type State = {
  users: UserInfo[];
  userInfo: Nullable<UserInfo>;
  token?: string;
};

export const useUserStore = defineStore("user", {
  state: (): State => ({
    users: [],
    userInfo: null,
    token: "Bearer",
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
    setUserInfo(user: UserInfo | null) {
      this.userInfo = user;
    },

    async login(params: any): Promise<any> {
      const data = api
        .login(params)
        .then((res: any) => {
          StorageManager.set(USER_INFO_KEY, res);
          this.setUserInfo(res);
          this.setToken(res.token);
        })
        .catch((error: any) => {
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

    logout() {
      // this.$patch({
      //   users: [],
      //   userInfo: null,
      //   token: "",
      // });
      this.$reset();
    },
  },

  // 开启数据缓存
  persist: true,
});
