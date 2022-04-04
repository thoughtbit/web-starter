import { UserState } from "@/store/modules/user/types";
import request from "./request";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

const UserApiService = {
  // 添加用户
  createUser: (data: Recordable) => {
    return request({
      url: "/api/users",
      method: "post",
      data,
    });
  },

  // 更新某个用户
  updateUser: (data: Recordable, id: number) => {
    return request({
      url: `/api/users/${id}`,
      method: "put",
      data,
    });
  },

  // 删除某个用户
  deleteUser: (id: number) => {
    return request({
      url: `/api/users/${id}`,
      method: "delete",
    });
  },

  // 获取某个用户
  getUserById: (id: number) => {
    return request({
      url: `/api/users/${id}`,
      method: "get",
    });
  },

  // 获取全部用户
  // users?page=1&limit=10
  // users?search=user1 - search by all fields for string user1
  // users?title=cool%20user - search by title field for string user1
  // getUsers: (query: any) => {
  //   return request({
  //     baseURL: "https://61303d0d5fc50700175f182e.mockapi.io",
  //     url: "/users",
  //     method: "get",
  //     params: query,
  //   });
  // },

  getUsers: () => {
    return request({
      url: "/api/users",
      method: "get",
    });
  },
  login: (data: LoginData) => {
    return request.post<LoginRes>("/api/user/login", data);
  },
  logout: () => {
    return request.post<LoginRes>("/api/user/logout");
  },
  getUserInfo: () => {
    return request.get<UserState>("/api/users/getUserInfo");
  },
};

const CommonApiService = {};

export default {
  ...UserApiService,
  ...CommonApiService,
};
