import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './contact.styl';

export default class Contact extends Component {
  config = {
    navigationBarTitleText: '通讯录'
  }

  constructor () {
    super(...arguments)
    this.state = {}
  }

  componentDidMount () {
    console.log('contact mount')
  }

  componentDidShow () {
    console.log('contact show')
  }

  componentDidHide () {
    console.log('contact hide')
  }

  componentWillUnmount () {
    console.log('contact unmount')
  }

  render () {
    return (
      <View className='page'>
        <Text>通讯录</Text>
      </View>
    )
  }
}