import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Message from './pages/message'

import configStore from './store'

import './app.styl'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/message/message',
      'pages/service/service',
      'pages/contact/contact',
      'pages/mine/mine',
      'pages/auth/auth'
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
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Message />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
