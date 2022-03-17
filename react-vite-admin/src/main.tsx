import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { MODE } from './constants';

import App from './App';

import 'virtual:windi.css';
import 'virtual:windi-devtools';
import 'antd/dist/antd.css';
import './assets/styles/app.scss';

if (MODE === 'development') {
  const modules = import.meta.globEager('./mocks/index.ts');
  modules['./mocks/index.ts'].default({ environment: MODE });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
