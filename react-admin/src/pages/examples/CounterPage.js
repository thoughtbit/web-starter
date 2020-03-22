import React from 'react';
import { Component, PropTypes } from './../../common';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './../../redux/models/counter';

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class CounterPage extends Component {
  static propTypes = {
    counter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { add, minus, asyncAdd } = this.props.actions;
    return (
      <div className="examples-counter-page">
        <button type="button" className='add_btn' onClick={add}>+</button>
        <button type="button" className='dec_btn' onClick={minus}>-</button>
        <button type="button" className='dec_btn' onClick={asyncAdd}>async</button>
      </div>
    );
  }
}
