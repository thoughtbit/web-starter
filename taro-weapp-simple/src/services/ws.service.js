import { stringify } from 'qs';
import AuthService from "./auth.service";
import API_CONFIG from '../config/api.config';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.store = null;
    this.lastPing = null;
    this.reconnectInterval = null;
  }

  init(store) {
    this.store = store;
  }

  connect() {
    if (this.isConnected()) return;
    this.socket = new WebSocket(API_CONFIG.WEB_SOCKET_URL);
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onclose = this.handleError.bind(this);
  }

  disconnect() {
    if (this.isConnected()) {
      this.socket.close(1000);
      this.socket = null;
    }
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  subscribe(channel) {
    this.send({
      command: "subscribe",
      identifier: JSON.stringify({ channel })
    });
  }

  getUrl() {
    const auth = stringify(AuthService.auth);
    return API_CONFIG.WEB_SOCKET_URL + `?${auth}`;
  }

  isConnected() {
    return Date.now() - this.lastPing < 6000;
  }

  handleMessage(message) {
    const data = JSON.parse(message.data);

    this.store.dispatch(data.message);
  }


  setLastPing(data) {
    this.lastPing = data.message * 1000;
  }

  startReconnectLoop() {
    this.reconnectInterval = setInterval(() => {
      if (this.isConnected()) return;
      this.store.dispatch(this.disconnected());
      this.connect();
    }, 10000);
  }

  handleOpen(e) {
    this.store.dispatch(this.connected());
    this.subscribe("UserChannel");
    clearInterval(this.reconnectInterval);
    this.startReconnectLoop();
  }

  handleClose(e) {
    clearInterval(this.reconnectInterval);
    console.log(e);
  }

  handleError(e) {
    console.log(e);
  }
}

export default new WebSocketService();
