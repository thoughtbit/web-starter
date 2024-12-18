import ajax from "./request";

export default {
  login: (data: Recordable) => {
    return ajax.request({
      url: "/login",
      method: "post",
      data: data,
    });
  },
};
