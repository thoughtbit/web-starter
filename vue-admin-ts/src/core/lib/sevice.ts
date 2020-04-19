import HttpClient from "./http";
import API from "./endpoints";

function serve({ serviceName = "", serviceArguments = {}, config = {}}): Promise<any> {
  // @ts-ignore
  const { method, endpoint } = API[serviceName];

  // @ts-ignore
  return HttpClient[method.toLocaleLowerCase()]({
    url: endpoint,
    payload: serviceArguments,
    config: config
  });
}

// 第二种实现方式
export default new Proxy({}, {
  get(target, serviceName:string) {
    return (serviceArguments: object, config: object) => {
      return serve({ serviceName, serviceArguments, config });
    }
  }
});

// 第一种实现方式
// export default Object.keys(API).reduce((pre, serviceName) => {
//   pre[serviceName] = (serviceArguments, config) => serve({ serviceName, serviceArguments, config})
//   return pre;
// }, {})
