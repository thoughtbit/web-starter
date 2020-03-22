import React from 'react';
import ReactDOM from 'react-dom';

// import initReactFastclick from 'react-fastclick';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

import './styles';

// initReactFastclick();

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister();
