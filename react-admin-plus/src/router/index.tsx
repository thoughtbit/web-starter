import { useRoutes, Navigate, Routes } from 'react-router-dom';
import { RenderRoutes } from '@/components';
import { formatModules } from '@/utils/formatModules';
import type { RouteObject } from './types';

const modules = import.meta.glob('./modules/*.tsx', { eager: true });
const appRouters = formatModules(modules, []);

export const routers: RouteObject[] | any = [
  {
    path: '/',
    element: <Navigate to="/demos" />,
    meta: {
      title: '首页',
    },
  },

  ...appRouters,
  {
    path: '*',
    element: <>404</>,
    meta: {
      title: '404 Not Found',
      requiresAuth: false,
    },
  },
];

export const useRouter = () => {
  const element = useRoutes(routers);
  return element;
};

export const RenderRouter = () => {
  const element = RenderRoutes(routers);
  return element ? <Routes>{element}</Routes> : null;
};
