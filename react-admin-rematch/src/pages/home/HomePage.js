import React from 'react';
import { Component, PropTypes } from './../../common';

class HomePage extends Component {
  // getUserInfo = async(id) => {
  //   // 并行
  //   const [profile, repo] = await Promise.all([
  //     getUserProfile(id),
  //     getUserRepo(id)
  //   ])
  //   return { profile, repo }
  // }

  render() {
    return (
      <div className="page-home">
        首页
      </div>
    );
  }
}



HomePage.propTypes = {
  
};
HomePage.defaultProps = {
  
};

export default HomePage;