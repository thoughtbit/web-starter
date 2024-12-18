import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError, uuid } from "../_utils";

const userInfo = {
  "id": 1,
  "userId": uuid,
  "deptId": 103,
  "userName": "admin",
  "nickName": "李明",
  "phone": "15888888888",
  "name": "李明",
  "email": "moocss@email.com",
  "status": "1",
  "company": "信息技术有限公司",
  "gender": "1",
  "createBy": "admin",
  "createTime": "2023-09-25 12:20:10",
  "updateTime": "2023-09-25 12:20:10",
  "remark": "我是管理员",
  "type": "管理员",
  "avatar": "https://tdesign.gtimg.com/starter/cloud-db.jpg",
  "loginIp": "180.113.234.75",
  "loginDate": "2023-08-18T14:16:56.000+08:00",
  "dept": {
    "createBy": null,
    "createTime": null,
    "updateBy": null,
    "updateTime": null,
    "remark": null,
    "deptId": 103,
    "parentId": 101,
    "ancestors": "0,100,101",
    "deptName": "研发部门",
    "orderNum": 1,
    "leader": "李明",
    "phone": null,
    "email": null,
    "status": "0",
    "delFlag": null,
    "parentName": null,
    "children": [],
  },
  "roles": [
    {
      "createBy": null,
      "createTime": null,
      "updateBy": null,
      "updateTime": null,
      "remark": null,
      "roleId": 1,
      "roleName": "超级管理员",
      "roleKey": "admin",
      "roleSort": 1,
      "dataScope": "1",
      "menuCheckStrictly": false,
      "deptCheckStrictly": false,
      "status": "0",
      "delFlag": null,
      "flag": false,
      "menuIds": null,
      "deptIds": null,
      "permissions": null,
      "admin": true,
    },
  ],
  "roleIds": null,
  "postIds": null,
  "roleId": null,
  "admin": true,
  "isDelete": "false",
};

// 用户相关模拟数据
export default [
  {
    url: "/api/users/getUserInfo",
    // timeout: 1000,
    method: "get",
    response: ({ query }) => {
      // if (query.id === 1) {
      //   return resultSuccess(userInfo);
      // } else {
      //   return resultError();
      // }

      console.log(" getUserInfo query>>>>>>>>", query);
      console.log("getUserInfo body>>>>>>>>", userInfo);

      return {
        code: 0,
        message: "ok",
        data: {
          user: userInfo,
          permissions: ["*:*:*"],
          roles: ["admin"],
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

      if (username === "admin" && password === "Admin@2023") {
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
          data: {},
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
  // 修改密码
  {
    url: "/api/user/change-password",
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
