import { Commit } from "vuex";
import SERVICE from "./sevice";

// 命名导出同构action映射器
export const mapActions = (API: Array<string>) => {
  return API.reduce((pre, serviceName: string) => {
    // @ts-ignore
    pre[serviceName] = (context: { commit: Commit}, serviceArguments:any) => {
      // @ts-ignore
      return SERVICE[serviceName](serviceArguments).then((res) => {
        // 把异步响应数据提交到mutation
        context.commit(serviceName, res.data);

        // 响应归一化：正常响应
        if(res.code === 0) {
          return {
            ok: true,
            payload: res
          }
        }
        // 响应归一化：非正常响应和各种错误
        return {
          ok: false,
          payload: res
        }
      });
    };
    return pre;
  }, {});
}
// 命名导出同构mutation映射器
export const mapMutations = (MAP: object) => {
  return Object.keys(MAP).reduce((pre, serviceName) => {
    // @ts-ignore
    pre[serviceName] = (state: any, data: any) => {
      // mutation根据配置把数据添加到state
      // @ts-ignore
      state[MAP[serviceName]] = data;
    };
    return pre;
  }, {});
}

/*
// 列子
export default {
  namespaced: true,
  state: initState,
  getters,
  mutations: {
    ...mapMutations({
      getUserList: 'users',
      getUser: 'user'
    })
  },
  actions: {
    ...mapActions([
      "getUserList",
      "getUser"
    ])
  }
}
*/
