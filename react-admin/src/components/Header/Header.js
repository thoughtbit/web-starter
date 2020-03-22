import React from 'react';
import { Link } from 'react-router-dom';
import { Component, /* PropTypes */ } from './../../common';

import './index.styl';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/">首页</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  
};
Header.defaultProps = {
  
};

export default Header;
