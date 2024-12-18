import { lazy } from 'react';
import type { RouteObject } from '../types';

const Demos = lazy(() => import('@/pages/demos'));
const Demo = lazy(() => import('@/pages/demos/demo'));
const Demo1 = lazy(() => import('@/pages/demos/demo1'));
const Demo2 = lazy(() => import('@/pages/demos/demo2'));
const Demo3 = lazy(() => import('@/pages/demos/demo3'));

const demoRouter: RouteObject[] = [
  {
    path: '/demos',
    element: <Demos />,
    meta: {
      title: '例子演示',
      icon: '',
    },
    children: [
      {
        path: 'demo',
        element: <Demo />,
        meta: {
          title: '例子',
        },
      },
      {
        path: 'demo1',
        element: <Demo1 />,
        meta: {
          title: '例子1',
        },
      },
      {
        path: 'demo2',
        element: <Demo2 />,
        meta: {
          title: '例子2',
        },
      },
      {
        path: 'demo3',
        element: <Demo3 />,
        meta: {
          title: '例子3',
        },
      },
    ],
  },
];

export default demoRouter;
