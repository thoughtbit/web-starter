import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Button } from '@tarojs/components'
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
export default class MinePage extends Component {
  config = {
    navigationBarTitleText: '我的'
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

  handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/auth/modules/login/login'
    })
  }

  handleLogout = () => {
    Taro.navigateTo({
      url: '/pages/mine/mine'
    });
    this.props.logout();
  }

  render () {
    const { user } = this.props.auth;
    return (
      <View className='page'>
        <Text>我的</Text>
        <Text>{user ? user.username : ''}</Text>
        <Button onClick={this.handleLogin}>登录</Button>
        <Button onClick={this.handleLogout}>退出登录</Button>
      </View>
    )
  }
}
