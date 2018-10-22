import find from 'lodash/find';
// import Loadable from 'react-loadable';

import App  from './../pages/App';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/auth';

import { PageNotFound, WelcomePage } from './../pages/common';

const normalRoutes = {
  path: '',
  name: 'Home',
  childRoutes: [
    { name: 'Home page', component: HomePage, isIndex: true },
    { path: '/welcome', name: 'Welcome page', component: WelcomePage },
    { path: '/login', name: 'Welcome page', exact: true, component: LoginPage }
  ]
};

const sharedRoutes = {

};

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  normalRoutes,
  sharedRoutes
];

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}];

// Handle isIndex property of route config:
// Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = find(route.childRoutes, (child => child.isIndex));
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
