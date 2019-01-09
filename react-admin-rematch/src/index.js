import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import * as Promise from 'bluebird';
import configStore from './redux/store';
import { routeConfig } from './router';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

import './styles';

global.Promise = Promise;

const store = configStore();

const renderApp = (app) => {
  render(
    <AppContainer>
      {app}
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(<Root store={store} routeConfig={routeConfig} />);

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./router/routeConfig', () => {
    const nextRouteConfig = require('./router/routeConfig').default;
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
  });
}

serviceWorker.unregister();
