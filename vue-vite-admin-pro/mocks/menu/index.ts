import type { MockMethod } from "vite-plugin-mock";

const getMenuData = () => {
 
    return {
      code: 0,
      message: "数据请求成功",
      data: [
        {
          "icon": "gongzuotai",
          "title": "工作台",
          "path": "/dashboard",
          "name": "home"
        },
        {
          "icon": "user",
          "title": "用户管理",
          "path": "/user-manage",
          "name" : "userManage",
          "children": [
            {
              "icon": "page",
              "title": "添加用户",
              "path": "/user-manage/add",
              "name": "userManageAdd"
            },
            {
              "icon": "page",
              "title": "用户列表",
              "path": "/user-manage/list",
              "name": "userManageList"
            }
          ]
        },
       
        // {
        //   "icon": "qita",
        //   "title": "演示",
        //   "path": "/demo",
        //   "name" : "demo",
        //   "children": [
        //     {
        //       "icon": "page",
        //       "title": "",
        //       "path": "",
        //       "name": ""
        //     },
        //     {
        //       "icon": "page",
        //       "title": "",
        //       "path": "",
        //       "name": "",
        //       "link": "http://vue-pro.arco.design/dashboard/workplace"
        //     }
        //   ]
        // },
      ],
    };
  
};

// 菜单模拟数据
export default [
  {
    url: "/api/menus",
    method: "get",
    statusCode: 200,
    response: ({ query }) => {
      console.log("query>>>>>>>>", query);
      return getMenuData();
    },
  },
] as MockMethod[];
