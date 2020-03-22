import React from 'react';
import { Component, PropTypes } from './../../common';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, getLoggedUser } from './../../redux/models/auth';

const mapStateToProps = state => ({
  auth: getLoggedUser(state)
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class SidePanel extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="examples-side-panel">
        <ul>
          <li>
            <Link to="/examples">Welcome</Link>
          </li>
          <li>
            <Link to="/examples/counter">Counter Demo</Link>
          </li>
          <li>
            <Link to="/examples/reddit">Reddit API Demo</Link>
          </li>
          <li>
            <Link to="/">Back to start page</Link>
          </li>
        </ul>
        <div className="memo">
          This is a Rekit feature that contains some examples for you to quick learn how Rekit works. To remove it just
          delete the feature.
        </div>
      </div>
    );
  }
}
