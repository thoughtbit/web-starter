import Mock from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
import { uuid } from "../_utils";

// 消息列表
function getMessageListData(type: string) {
  const getStatus = () => {
    switch (type) {
      case "all":
        return "@natural(1, 3)";
      case "dsl":
        return "1";
      case "ysh":
        return "2";
      case "yfb":
        return "3";
      default:
        return "@natural(1, 3)";
    }
  };
  return {
    code: 0,
    data: {
      ...Mock.mock({
        "list|10": [
          {
            "id|+1": 1,
            "message_id": uuid,
            "message_type": "事项类",
            "message_name|1": ["数据服务", "数据服务", "砖井地质信息数据服务"],
            "message_status|1": getStatus(),
            "message_author": "@cname()",
            "message_dept|1": ["研究院", "研究2院", "研究3院"],
            "create_time": '@date("yyyy-mm-dd")',
            "update_time": '2023-08-30 @date("HH:mm:ss")',
            "status|1": "@natural(0, 4)",
          },
        ],
      }),
      total: 50,
      pageNumber: 1,
      pageSize: 10,
    },
    message: "ok",
  };
}

export default [
  {
    url: "/api/message/list",
    method: "get",
    timeout: 2000,
    response: ({ query }) => {
      console.log("query>>>>>>>>", query);
      const { pageNumber, pageSize, type } = query;
      const data = getMessageListData(type);
      data.data.pageNumber = pageNumber;
      data.data.pageSize = pageSize;
      return data;
    },
  },
] as MockMethod[];
