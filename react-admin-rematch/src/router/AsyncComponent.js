import React from 'react';
import Loadable from 'react-loadable';
import { SceneLoader } from '../components/SceneLoader';

class AsyncComponent {
  load(path) {
    return Loadable({
      loader: () => import(`./../pages/${path}`),
      loading: () => <SceneLoader />,
      delay: 300,
      timeout: 10000
    });
  }
}

export default new AsyncComponent();
