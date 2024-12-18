import Mock from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError, uuid } from "../_utils";

const userInfo = {
  "id|+1": 1,
  userId: uuid,
  salary: "@natural(10, 500),000,000",
  name: "@cname()",
  email: "moocss@email.com",
  password: "",
  "status|1": "@natural(0, 4)",
  company: "@city()信息技术有限公司",
  "gender|1": "@natural(0, 2)",
  updateTime: '2020-05-30 @date("HH:mm:ss")',
  "type|1": ["管理员", "游客", "普通管理员"],
  "avatar|1": [
    "https://tdesign.gtimg.com/starter/cloud-db.jpg",
    "https://tdesign.gtimg.com/starter/cloud-server.jpg",
    "https://tdesign.gtimg.com/starter/ssl.jpg",
    "https://tdesign.gtimg.com/starter/t-sec.jpg",
    "https://tdesign.gtimg.com/starter/face-recognition.jpg",
  ],
  isDelete: "@boolean",
};

// 用户相关模拟数据
export default [
  {
    url: "/api/users",
    method: "get",
    statusCode: 200,
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          "list|1-100": [userInfo],
        }),
      },
      message: "ok",
    }),
  },
  {
    url: "/api/users/getUserInfo",
    timeout: 1000,
    method: "get",
    response: ({ query }) => {
      if (query.id === 1) {
        return resultSuccess(userInfo);
      } else {
        return resultError();
      }
    },
  },
  {
    url: "/api/users/:id",
    method: "get",
    response: ({ query }) => {
      console.log("id>>>>>>>>", query.id);
      return {
        code: 0,
        message: "ok",
        data: {
          userId: query.id,
          username: "admin",
        },
      };
    },
  },
  {
    url: "/api/users/:id",
    method: "delete",
    response: ({ query }) => {
      console.log("id>>>>>>>>", query.id);
      return {
        code: 0,
        message: "ok",
      };
    },
  },
  {
    url: "/api/users",
    method: "post",
    response: ({ body, query }) => {
      console.log("body>>>>>>>>", body);
      console.log("query>>>>>>>>", query);
      return {
        code: 0,
        message: "ok",
        data: body,
      };
    },
  },
  {
    url: "/api/users/:id",
    method: "put",
    response: ({ query, body }) => {
      console.log("query>>>>>>>>", query);
      console.log("body>>>>>>>>", body);
      return {
        code: 0,
        message: "ok",
        data: {
          userId: query.id,
          username: query.username,
        },
      };
    },
  },
  {
    url: "/api/user/login",
    method: "post",
    response: ({ body, query }) => {
      console.log("body>>>>>>>>", body);
      console.log("query>>>>>>>>", query);
      const { password, username } = body;

      if (username === "admin" && password === "Admin@2022") {
        return {
          code: 0,
          message: "用户登录成功",
          data: {
            token: "o5w0hoYeIWzMsxxCXKMdkZfveu2BLRXY",
            username: "admin",
          },
        };
      } else {
        return {
          code: 401,
          message: "账号或者密码错误",
          data: {}
        };
      }
    },
  },
  // 注册
  {
    url: "/api/user/register",
    method: "post",
    response: ({ body, query }) => {
      console.log("body>>>>>>>>", body);
      console.log("query>>>>>>>>", query);
      return {
        code: 0,
        message: "ok",
        data: body,
      };
    },
  },
  // 找回密码
  {
    url: "/api/user/forget",
    method: "post",
    response: ({ body, query }) => {
      console.log("body>>>>>>>>", body);
      console.log("query>>>>>>>>", query);
      return {
        code: 0,
        message: "ok",
        data: body,
      };
    },
  },
  // 退出
  {
    url: "/api/user/logout",
    method: "post",
    statusCode: 200,
    response: () => {
      const data = {};
      return resultSuccess(data);
    },
  },
] as MockMethod[];
