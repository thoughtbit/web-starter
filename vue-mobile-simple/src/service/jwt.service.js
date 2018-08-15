import localStore from './../utils/local-store';

const TOKEN_KEY = 'id_token';

export default {
  getToken() {
    return localStore.get(TOKEN_KEY);
  },
  saveToken(token) {
    localStore.set(TOKEN_KEY, token);
  },
  destroyToken() {
    localStore.remove(TOKEN_KEY);
  },
};
