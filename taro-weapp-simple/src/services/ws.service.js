import Taro from '@tarojs/taro';
// import { stringify } from 'qs';
// import AuthService from "./auth.service";
import ConfigService from './config.service';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.store = null;
  }

  init(store) {
    this.store = store;
  }

  connect() {
    const url = ConfigService.get('websocket_url');
    this.socket = Taro.connectSocket({
      url,
      success: function () {
        return true
      },
      fail: function() {
        return false
      }
    }).then(task => {
      task.onOpen(function () {
        console.log('onOpen')
        task.send({ data: 'xxx' })
      })
      task.onMessage(function (msg) {
        console.log('onMessage: ', msg)
        task.close()
      })
      task.onError(function () {
        console.log('onError')
      })
      task.onClose(function (e) {
        console.log('onClose: ', e)
      })
    })
  }

  disconnect() {

  }

  send(data) {
    console.log(data);
  }

  isConnected() {

  }

  handleMessage(message) {
    console.log(message);
  }

  handleOpen(e) {
    console.log(e);
  }

  handleClose(e) {
    console.log(e);
  }

  handleError(e) {
    console.log(e);
  }
}

export default new WebSocketService();
