import type { MockMethod } from "vite-plugin-mock";

const getMenuData = () => {
  return {
    code: 0,
    message: "数据请求成功",
    data: [
      {
        "icon": "work",
        "title": "工作台",
        "path": "/dashboard",
      },
      {
        "icon": "user",
        "title": "用户管理",
        "path": "/user-manage",
        "children": [
          {
            "icon": "page",
            "title": "添加用户",
            "path": "/user-manage/add",
          },
          {
            "icon": "page",
            "title": "用户列表",
            "path": "/user-manage/list",
          },
        ],
      },
      // {
      //   "icon": "qita",
      //   "title": "演示",
      //   "path": "/demo",
      //   "children": [
      //     {
      //       "icon": "page",
      //       "title": "",
      //       "path": "",
      //     },
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
    response: () => {
      return getMenuData();
    },
  },
] as MockMethod[];
