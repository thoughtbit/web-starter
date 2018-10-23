import React from 'react';
import { Component, PropTypes } from './../../common';

import './index.scss'

class SceneLoader extends Component {
  render() {
    return (
      <div className="sceneloader">
        <div className="sceneloader__loader" title="加载中..." />
      </div>
    );
  }
}

SceneLoader.propTypes = {
  
};
SceneLoader.defaultProps = {
  
};

export default SceneLoader;