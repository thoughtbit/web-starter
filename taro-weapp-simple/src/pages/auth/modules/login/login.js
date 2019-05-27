import Taro from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Button, Input  } from '@tarojs/components'
import { bindActionCreators } from 'redux'
import { ButtonItem, InputItem } from '@components';
import { Component } from './../../../../common';
import { actions } from './../../../../redux/modules/auth'

import './index.styl';

const mapStateToProps = (state, ownProps) => ({
  ...state.login,
  ...ownProps
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class LoginPage extends Component {
  config = {
    navigationBarTitleText: '登录'
  };
  constructor() {
    super(...arguments);
    this.state = {
      username: '',
      password: '',
      loading: false
    };
  }
  componentDidMount() {
    console.log('login mount');
  }
  componentDidShow() {
    console.log('login show');
  }
  componentDidHide() {
    console.log('login hide');
  }
  componentWillUnmount() {
    console.log('login unmount');
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    this.setState({ loading: true });
    this.props.login(username, password).then((data) => {
      console.log("=======>", data);
      this.setState({ loading: false });
      Taro.navigateBack({ delta: 1 });
      Taro.showToast({
        title: data.message,
        icon: 'none'
      });
    }).catch((err) => {
      this.setState({ loading: false })
      Taro.showToast({
        title: err.message,
        icon: 'none'
      });
    });
  }

  handleBack = () => {
    Taro.navigateBack({ delta: 1 });
  }

  render() {
    const { username, password, loading } = this.state;
    const isBtnDisabled = !username || !password;

    return (
      <View className='user-login'>
        <View className='user-login__logo'>
          <Text className='user-login__logo-img'>Logo</Text>
        </View>
        <View className='user-login__wrap'>
          <InputItem
            value={username}
            placeholder='账号'
            onInput={this.handleInput.bind(this, 'username')}
          />
          <InputItem
            password
            value={password}
            placeholder='密码'
            onInput={this.handleInput.bind(this, 'password')}
          />
        </View>
        <View className='user-login__btn'>
          <ButtonItem
            text='登录'
            disabled={isBtnDisabled}
            loading={loading}
            onClick={this.handleLogin}
          />
          <Button onClick={this.handleBack}>返回</Button>
        </View>
      </View>
    );
  }
}
