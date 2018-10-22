import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import configStore from './redux/store';
import routeConfig from './router/routeConfig';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

const store = configStore();

function renderApp(app) {
  render(
    <AppContainer>
      {app}
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(<Root store={store} routeConfig={routeConfig} />);

if (module.hot) {
  module.hot.accept('./router/routeConfig', () => {
    const nextRouteConfig = require('./router/routeConfig').default;
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
  });
}

serviceWorker.unregister();
