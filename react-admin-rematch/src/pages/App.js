import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from './../components/Header'

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
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