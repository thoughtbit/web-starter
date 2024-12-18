import qs from "qs";
import request from "./request";

const UserApiService = {
  // 添加用户
  createUser: (data: Recordable) => {
    return request({
      url: "/api/users",
      method: "post",
      data: data,
    });
  },

  // 更新某个用户
  updateUser: (data: Recordable, id: number) => {
    return request({
      url: `/api/users/${id}`,
      method: "put",
      data: data,
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
  login: (data: Recordable) => {
    return request({
      url: "/api/user/login",
      method: "post",
      data: data,
    });
  },
  register: (data: Recordable) => {
    return request({
      url: "/api/user/register",
      method: "post",
      data: data,
    });
  },
  forget: (data: Recordable) => {
    return request({
      url: "/api/user/forget",
      method: "post",
      data: data,
    });
  },
  logout: () => {
    return request({
      url: "/api/user/logout",
      method: "post",
    });
  },
};

const CommonApiService = {

};

const MenuApiService = {
  getMenuList: (query: any) => {
    return request({
      url: "/api/menus",
      method: "get",
      params: query,
    });
  },
};

export default {
  ...UserApiService,
  ...MenuApiService,
  ...CommonApiService,
};
