import React, { lazy, Suspense } from 'react';
import { SceneLoader } from './../components/SceneLoader';
import App from './../pages/App';

const Home = lazy(() => import('./../pages/home/HomePage'));
const Login = lazy(() => import('./../pages/auth/modules/login/LoginPage'));
const Welcome = lazy(() => import('./../pages/common/WelcomePage'));
const PageNotFound = lazy(() => import('./../pages/common/PageNotFoundPage'));

const authorizedRoutes = {
  path: 'auth',
  name: 'Authorized',
  childRoutes: [
  ],
};

const normalRoutes = {
  path: '',
  name: 'Home',
  childRoutes: [
    {
      name: 'Home page',
      component: () => (
        <Suspense fallback={<SceneLoader />}>
          <Home />
        </Suspense>
      ),
      isIndex: true
    },
    {
      path: '/welcome',
      name: 'Welcome page',
      component: () => (
        <Suspense fallback={<SceneLoader />}>
          <Welcome />
        </Suspense>
      ),
    },
    {
      path: '/login',
      name: 'Login page',
      component: () => (
        <Suspense fallback={<SceneLoader />}>
          <Login />
        </Suspense>
      ),
    }
  ]
};

const sharedRoutes = {

};

const examplesRoutes = {
  // path: 'examples',
  // component: Layout,
  // childRoutes: [
  //   { path: '', component: WelcomePage, isIndex: true },
  //   { path: 'counter', component: CounterPage },
  //   { path: 'reddit', component: RedditListPage },
  // ],
}

const childRoutes = [
  authorizedRoutes,
  sharedRoutes,
  normalRoutes,
  examplesRoutes,
];

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { 
      path: '*', 
      name: 'Page not found', 
      component: () => (
        <Suspense fallback={<SceneLoader />}>
          <PageNotFound />
        </Suspense>
      ),
    },
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
    // first.path = route.path;
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);

export default routes;
