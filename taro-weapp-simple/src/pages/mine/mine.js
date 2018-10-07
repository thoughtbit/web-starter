import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './mine.styl';

export default class Mine extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  constructor () {
    super(...arguments)
    this.state = {}
  }

  componentDidMount () {
    console.log('mine mount')
  }

  componentDidShow () {
    console.log('mine show')
  }

  componentDidHide () {
    console.log('mine hide')
  }

  componentWillUnmount () {
    console.log('mine unmount')
  }

  render () {
    return (
      <View className='page'>
        <Text>我的</Text>
      </View>
    )
  }
}