import App from './../pages/App';
import AsyncComponent from './AsyncComponent';
// import { HomePage } from './../pages/home';
// import { LoginPage } from './../pages/auth';
// import { PageNotFoundPage, WelcomePage } from './../pages/common';

const HomePage = AsyncComponent.load('home/HomePage');
const LoginPage = AsyncComponent.load('auth/modules/login/LoginPage');
const WelcomePage = AsyncComponent.load('common/WelcomePage');
const PageNotFoundPage = AsyncComponent.load('common/PageNotFoundPage');

const authorizedRoutes = {

};

const normalRoutes = {
  path: '',
  name: 'Home',
  // component: HomePage,
  childRoutes: [
    { name: 'Home page', component: HomePage, isIndex: true },
    { path: '/welcome', name: 'Welcome page', component: WelcomePage },
    { path: '/login', name: 'Login page', component: LoginPage }
  ]
};

const sharedRoutes = {

};

const childRoutes = [
  authorizedRoutes,
  sharedRoutes,
  normalRoutes
];

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { path: '*', name: 'Page not found', component: PageNotFoundPage },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}];

// Handle isIndex property of route config:
// Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex);
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = route.path;
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
