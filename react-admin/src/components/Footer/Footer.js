import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Component, /* PropTypes */ } from '../../common';

import './index.styl';

class Footer extends Component {
  render() {
    const { match } = this.props;
    const items = [
      { link: '/about', icon: 'about', label: '关于我们' },
      { link: '/linkes', icon: 'links', label: '友情链接' },
      { link: '/map', icon: 'map', label: '网站地图' },
    ];

    return (
      <div className="footer">
        <ul>
          { items.map((item, index) => {
            return (
              <li key={`tab_${index}`}>
                <Route path={item.link} children={({ match }) => (
                  <Link to={item.link} className={match ? 'active' : ''}>
                    <i className={`icon icon-${item.icon}`}></i>
                    {item.label}
                  </Link>
                )}/>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

Footer.propTypes = {
  
};
Footer.defaultProps = {
  
};

export default Footer;
