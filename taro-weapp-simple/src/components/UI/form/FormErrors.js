import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Component, PropTypes } from './../../common';

class FormErrors extends Component {
  errors() {
    const err = this.props.errors;
    if (err.full_messages) {
      return err.full_messages;
    } else if (Array.isArray(err)) {
      return err;
    } else if (typeof err === "object") {
      return [err[Object.keys(err)[0]]];
    } else if (typeof err === "string") {
      return [err];
    } else {
      return ["There was an error"];
    }
  }

  render() {
    if (!this.props.errors) return null;

    return (
      <View className='formErrors'>
        {this.errors().map(err => <View key={err}>{err}</View>)}
      </View>
    );
  }
}

FormErrors.propTypes = {
  errors: PropTypes.any
}

export default FormErrors;
