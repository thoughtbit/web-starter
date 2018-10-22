import API_CONFIG from './../config/api.config';


class WebSocketService {
  constructor() {
    this.socket = null;
    this.store = null;
  }

  init(store) {
    this.store = store;
  }

  connect() {
    const url = API_CONFIG.WEB_SOCKET_URL;
  }

  disconnect() {

  }

  send(data) {

  }

  subscribe(channel) {

  }

  getUrl() {

  }

  isConnected() {

  }

  handleMessage(message) {

  }

  setLastPing(data) {

  }

  handleOpen(e) {

  }

  handleClose(e) {
    console.log(e);
  }

  handleError(e) {
    console.log(e);
  }
}

export default new WebSocketService();
