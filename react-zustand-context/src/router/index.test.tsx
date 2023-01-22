import { FC, lazy } from 'react';
import { useRoutes, Navigate, Routes } from 'react-router-dom';
import { renderRoutes } from '@/components';
import BasicLayout from '@/layouts/basic-layout';
import type { RouteObject } from './types';

export const routers: RouteObject[] | any = [
  {
    path: '/',
    element: <Navigate to="/admin/index" />,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/admin',
    element: <BasicLayout />,
    meta: {
      title: '系统路由',
    },
    children: [
      {
        path: 'index',
        children: [
          { index: true, element: <>组件</> },
          { path: 'list', element: <>组件2</> },
        ],
      },
      {
        path: 'user',
        children: [
          { index: true, element: <>用户列表</> },
          { path: ':id', element: <>用户详情</> },
        ],
      },
    ],
  },
  {
    element: <BasicLayout />,
    children: [
      {
        path: 'foo',
        element: <>foo</>,
      },
      {
        path: 'bar',
        element: <>bar</>,
      },
    ],
  },

  { path: '*', element: <>404</> },
];

export const useRouter = () => {
  const element = useRoutes(routers);
  return element;
};

export const RenderRouter: FC = () => {
  const element = renderRoutes(routers);
  return <Routes>{element}</Routes>;
};
