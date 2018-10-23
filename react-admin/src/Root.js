import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, history } from './router'

const Root = ({ store, routeConfig }) => {
  return (
    <Provider store={store}>
      <Router history={history} config={routeConfig}></Router>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  routeConfig: PropTypes.array.isRequired
};

export default Root;