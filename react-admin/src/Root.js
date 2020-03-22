import React, { Suspense } from 'react';
import { setConfig, hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, history, routeConfig } from './router';
import configStore from './redux/store';

setConfig({
  logLevel: 'debug',
  errorReporter: false
});

const store = configStore();

const Root = () => (
  <Suspense fallback={ null }>
    <Provider store={store}>
      <Router history={history} config={routeConfig}></Router>
    </Provider>
  </Suspense>
)

export default hot(module)(Root)
