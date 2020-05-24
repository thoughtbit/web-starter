// hash 模式,项目路由用的是hash模式会用到该函数
export function hashPrefix(path: string) {
  return (location: Location) => location.hash.startsWith(`#${path}`)
}

// history 模式，项目路由用的是history模式会用到该函数
export function pathPrefix(path: string) {
  return (location: Location) => location.pathname.startsWith(`${path}`)
}

export default function getApps (props: any = {}, loader: any) {
  return [
    {
      name: "ReactMicroApp",
      entry: "//localhost:9003",
      container: "#subapp-viewport",
      activeRule: pathPrefix('/react'),
      loader,
      // 通过 props 将 shared 传递给子应用
      props,
    },
    {
      name: "VueMicroApp",
      entry: "//localhost:9002",
      container: "#subapp-viewport",
      activeRule: pathPrefix('/vue'),
      loader,
      // 通过 props 将 shared 传递给子应用
      props,
    },
    {
      name: 'VueMicroAppTs',
      entry: '//localhost:9001',
      container: '#subapp-viewport',
      activeRule: pathPrefix('/app1'),
      loader,
      props,
    }
  ]
}
