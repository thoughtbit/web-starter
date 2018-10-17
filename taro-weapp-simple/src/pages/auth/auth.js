import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.styl';

export default class AuthPage extends Component {
  config = {
    navigationBarTitleText: '认证'
  }

  constructor () {
    super(...arguments)
    this.state = {}
  }

  componentDidMount () {
    console.log('auth mount')
  }

  componentDidShow () {
    console.log('auth show')
  }

  componentDidHide () {
    console.log('auth hide')
  }

  componentWillUnmount () {
    console.log('auth unmount')
  }

  render () {
    return (
      <View className='page'>
        <Text>认证</Text>
      </View>
    )
  }
}
