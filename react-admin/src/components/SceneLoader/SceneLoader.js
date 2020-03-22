import React, { memo } from 'react';

import './index.styl'

const SceneLoader = memo(() => (
  <div className="sceneloader">
    <div className="sceneloader__loader" title="加载中..." />
  </div>
));

export default SceneLoader;
