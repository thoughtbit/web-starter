import React from 'react';
import { Component, PropTypes } from './../../common';
import { SidePanel } from './SidePanel';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="examples-layout">
        <SidePanel />
        <div className="examples-page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
