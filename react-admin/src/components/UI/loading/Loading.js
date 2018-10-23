import React from 'react';
import { Component } from './../../common';

import './index.styl';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return (
      <React.Fragment>
        <div className="loading">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        { this.container }
      </React.Fragment>
    );
  }
}

export default Loading;
