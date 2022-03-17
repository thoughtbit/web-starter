import React from 'react';
import ReactDOM from 'react-dom';
import { MODE } from './constants';

import App from './App';

import 'virtual:windi.css';
import 'virtual:windi-devtools';
import "toastify-js/src/toastify.css";
import './assets/styles/app.scss';

if (MODE === 'development') {
  const modules = import.meta.globEager('./mocks/index.ts');
  modules['./mocks/index.ts'].default({ environment: MODE });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
