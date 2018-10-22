import React from 'react';
import { Component, PropTypes } from './../common';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="page-container">{this.props.children}</div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
App.defaultProps = {
  children: '',
};

export default App;