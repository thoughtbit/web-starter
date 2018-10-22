import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Component, PropTypes } from './../../common';

class FormMessage extends Component {
  render() {
    if (!this.props.message) return null;
    return (
      <View className='formMessage'>
        <Text>{this.props.message}</Text>
      </View>
    );
  }
}

FormMessage.propTypes = {
  message: PropTypes.string
}

export default FormMessage;
