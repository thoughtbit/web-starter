import StorageManager, { TOKEN_KEY } from "@/services/storage";

const isLogin = () => {
  return StorageManager.get(TOKEN_KEY);
};

const getToken = () => {
  return StorageManager.get(TOKEN_KEY);
};

const setToken = (token: string) => {
  StorageManager.set(TOKEN_KEY, token);
};

const clearToken = () => {
  StorageManager.remove(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
