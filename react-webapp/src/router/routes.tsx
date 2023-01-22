import React, { useMemo } from 'react';
import { generatePath, Navigate, useParams, Outlet } from 'react-router-dom';
import { RouteContext, useRouteData } from './route-context';
import { IClientRoute, IRoute, IRoutesById } from './types';
import { useAppData } from './app-context';

export function createClientRoutes(opts: {
  routesById: IRoutesById;
  routeComponents: Record<string, any>;
  parentId?: string;
  loadingComponent?: React.ReactNode;
}) {
  const { routesById, parentId, routeComponents } = opts;
  return Object.keys(routesById)
    .filter((id) => routesById[id].parentId === parentId)
    .map((id) => {
      const route = createClientRoute({
        route: routesById[id],
        routeComponent: routeComponents[id],
        loadingComponent: opts.loadingComponent,
      });
      const children = createClientRoutes({
        routesById,
        routeComponents,
        parentId: route.id,
        loadingComponent: opts.loadingComponent,
      });
      if (children.length > 0) {
        route.children = children;
        // TODO: remove me
        // compatible with @ant-design/pro-layout
        route.routes = children;
      }
      return route;
    });
}

function NavigateWithParams(props: { to: string }) {
  const params = useParams();
  const propsWithParams = {
    ...props,
    to: generatePath(props.to, params),
  };
  return <Navigate replace={true} {...propsWithParams} />;
}

function createClientRoute(opts: {
  route: IRoute;
  routeComponent: any;
  loadingComponent?: React.ReactNode;
  hasChildren?: boolean;
  reactRouter5Compat?: boolean;
}): IClientRoute {
  const { route } = opts;
  const { redirect, ...props } = route;
  const Remote = opts.reactRouter5Compat
    ? RemoteComponentReactRouter5
    : RemoteComponent;
  return {
    element: redirect ? (
      <NavigateWithParams to={redirect} />
    ) : (
      <RouteContext.Provider
        value={{
          route: opts.route,
        }}
      >
        <Remote
          loader={React.memo(opts.routeComponent)}
          loadingComponent={opts.loadingComponent || DefaultLoading}
          hasChildren={opts.hasChildren}
        />
      </RouteContext.Provider>
    ),
    ...props,
  };
}

function DefaultLoading() {
  return <div />;
}

function RemoteComponentReactRouter5(props: any) {
  const { route } = useRouteData();
  const { history, clientRoutes } = useAppData();
  const params = useParams();
  const match = {
    params,
    isExact: true,
    path: route.path,
    url: history.location.pathname,
  };

  // staticContext 没有兼容 好像没看到对应的兼容写法
  const Component = props.loader;

  return (
    <React.Suspense fallback={<props.loadingComponent />}>
      <Component
        location={history.location}
        match={match}
        history={history}
        params={params}
        route={route}
        routes={clientRoutes}
      >
        {props.hasChildren && <Outlet />}
      </Component>
    </React.Suspense>
  );
}

function RemoteComponent(props: any) {
  const Component = props.loader;
  return (
    <React.Suspense fallback={<props.loadingComponent />}>
      <Component />
    </React.Suspense>
  );
}