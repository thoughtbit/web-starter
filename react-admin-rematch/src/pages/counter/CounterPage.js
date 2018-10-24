import React, { Component } from 'react';
import { connect } from 'react-redux';

class CounterPage extends Component {
  render () {
    return (
      <div>
        <p>Current value {this.props.counter} </p>
        <p>
          <button onClick={this.props.incrementBy3}>Increment</button>
        </p>
      </div>
    )
  }
}

const mapState = state => ({
  counter: state.counter
})

const mapDispatch = ({ counter: { increment, incrementAsync } }) => ({
  incrementBy3: () => increment(3)
})

export default connect(mapState, mapDispatch)(CounterPage)