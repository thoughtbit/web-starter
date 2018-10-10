import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import  { MessagePage } from './pages/message'
import configStore from './redux/store'

import './styles'

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/message/MessagePage',
      'pages/service/ServicePage',
      'pages/contact/ContactPage',
      'pages/mine/MinePage',
      'pages/auth/AuthPage'
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
          pagePath: 'pages/message/MessagePage',
          iconPath: 'assets/icons/view.png',
          selectedIconPath: 'assets/icons/view_on.png',
          text: '消息'
        },
        {
          pagePath: 'pages/service/ServicePage',
          iconPath: 'assets/icons/view.png',
          selectedIconPath: 'assets/icons/view_on.png',
          text: '工作台'
        },
        {
          pagePath: 'pages/contact/ContactPage',
          iconPath: 'assets/icons/view.png',
          selectedIconPath: 'assets/icons/view_on.png',
          text: '通讯录'
        },
        {
          pagePath: 'pages/mine/MinePage',
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
        <MessagePage />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
