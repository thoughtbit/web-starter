const { MODE } = import.meta.env;
const DEBUG = process.env.NODE_ENV !== "production";
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const APP_API_URL = import.meta.env.VITE_APP_API_URL;
const APP_API_URL_PREFIX = import.meta.env.VITE_APP_API_URL_PREFIX;

const JWT_TOKEN = import.meta.env.VITE_APP_JWT_TOKEN;

export { MODE, DEBUG, APP_VERSION, APP_BASE_URL, APP_API_URL, APP_API_URL_PREFIX, JWT_TOKEN };
