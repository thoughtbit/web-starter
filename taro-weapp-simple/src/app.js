import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import  { MessagePage } from './pages/message';
import configStore from './redux/store';

import './styles';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  config = {
    pages: [
      'pages/message/message',
      'pages/service/service',
      'pages/contact/contact',
      'pages/mine/mine',
      'pages/auth/auth',
      'pages/auth/modules/login/login',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#db0634',
      navigationBarTitleText: '风信办公',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: false
    },
    tabBar: {
      color: '#353535',
      selectedColor: '#db0634',
      borderStyle: '#eeeeee',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/message/message',
          iconPath: 'assets/icons/view.png',
          selectedIconPath: 'assets/icons/view_on.png',
          text: '消息'
        },
        {
          pagePath: 'pages/service/service',
          iconPath: 'assets/icons/view.png',
          selectedIconPath: 'assets/icons/view_on.png',
          text: '工作台'
        },
        {
          pagePath: 'pages/contact/contact',
          iconPath: 'assets/icons/view.png',
          selectedIconPath: 'assets/icons/view_on.png',
          text: '通讯录'
        },
        {
          pagePath: 'pages/mine/mine',
          iconPath: 'assets/icons/view.png',
          selectedIconPath: 'assets/icons/view_on.png',
          text: '我的'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <MessagePage />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
