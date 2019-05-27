import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import { bindActionCreators } from 'redux'
import { actions, getLoggedUser } from './../../redux/modules/auth'

import './index.styl';

const mapStateToProps = state => ({
  auth: getLoggedUser(state)
})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)
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
    const { user } = this.props.auth;
    return (
      <View className='page'>
        <Text>认证</Text>
        <Text>{user ? user.username : ''}</Text>
      </View>
    )
  }
}
