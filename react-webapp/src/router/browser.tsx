import React from "react";
import { History } from "history";
import { Router, Routes } from "react-router-dom";
import { parse } from 'qs';
import { IRouteComponents, IRoutesById } from "./types";
import { createClientRoutes } from "./routes";
import { AppContext } from "./app-context";

export type RenderClientOpts = {
  /**
   * 配置 webpack 的 publicPath。
   * @doc https://umijs.org/docs/api/config#publicpath
   */
  publicPath?: string;
  /**
   * 是否是 runtimePublicPath
   * @doc https://umijs.org/docs/api/config#runtimepublicpath
   */
  runtimePublicPath?: boolean;
  /**
   * react dom 渲染的的目标 dom
   * @doc 一般不需要改，微前端的时候会变化
   */
  rootElement?: HTMLElement;
  /**
   * 当前的路由配置
   */
  routes: IRoutesById;
  /**
   * 当前的路由对应的dom组件
   */
  routeComponents: IRouteComponents;
  /**
   * 插件的执行实例
   */
  pluginManager: any;
  /**
   * 设置路由 base，部署项目到非根目录下时使用。
   * @doc https://umijs.org/docs/api/config#base
   */
  basename?: string;
  /**
   * loading 中展示的组件 dom
   */
  loadingComponent?: React.ReactNode;
  /**
   * react router 的 history，用于控制列表渲染
   * @doc https://umijs.org/docs/api/config#history
   * 有多种不同的类型，测试的时候建议用 内存路由，默认是 browserHistory
   */
  history: History;
  /**
   * ssr 的配置
   */
  hydrate?: boolean;

  /**
   * 直接返回组件，是为了方便测试
   */
  components?: boolean;
  /**
   * 启用 react-router 5 兼容模式。
   * 此模式下，路由组件的 props 会包含 location、match、history 和 params 属性，和 react-router 5 的保持一致。
   */
  reactRouter5Compat?: boolean;
};

const getBrowser = (opts: RenderClientOpts, routesElement: React.ReactElement) => {
  const basename = opts.basename || "/";
  const clientRoutes = createClientRoutes({
    routesById: opts.routes,
    routeComponents: opts.routeComponents,
    loadingComponent: opts.loadingComponent,
  });

  let rootContainer = (
    <BrowserRoutes
      basename={basename}
      pluginManager={opts.pluginManager}
      routes={opts.routes}
      clientRoutes={clientRoutes}
      history={opts.history}
    >
      {routesElement}
    </BrowserRoutes>
  );

  return (
    <AppContext.Provider
      value={{
        routes: opts.routes,
        routeComponents: opts.routeComponents,
        clientRoutes,
        history: opts.history,
      }}
    >
      {rootContainer}
    </AppContext.Provider>
  );
};

/**
 * 这个组件的功能是 history 发生改变的时候重新触发渲染
 * @param props
 * @returns
 */
function BrowserRoutes(props: {
  routes: any;
  clientRoutes: any;
  pluginManager: any;
  history: History;
  basename: string;
  children: any;
}) {
  const { history } = props;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router navigator={history} location={state.location} basename={props.basename}>
      {props.children}
    </Router>
  );
}


export const query = parse(history.location.search);
