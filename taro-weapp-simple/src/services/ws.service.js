import Taro from '@tarojs/taro';
// import { stringify } from 'qs';
// import AuthService from "./auth.service";
import API_CONFIG from '../config/api.config';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.store = null;
  }

  init(store) {
    this.store = store;
  }

  connect() {
    this.socket = Taro.connectSocket({
      url: API_CONFIG.WEB_SOCKET_URL,
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
