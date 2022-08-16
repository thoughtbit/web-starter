const MODE = import.meta.env.MODE;
const DEBUG = !["staging", "production"].includes(MODE);
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const APP_API_URL = import.meta.env.VITE_APP_API_URL;
const APP_API_URL_PREFIX = import.meta.env.VITE_APP_API_URL_PREFIX;
const APP_NAME = import.meta.env.VITE_APP_NAME;
const JWT_TOKEN = import.meta.env.VITE_APP_JWT_TOKEN;

// console.log("[constants]",  MODE, DEBUG, APP_VERSION, APP_BASE_URL, APP_API_URL, APP_API_URL_PREFIX, JWT_TOKEN);

export { MODE, DEBUG, APP_VERSION, APP_BASE_URL, APP_API_URL, APP_API_URL_PREFIX, APP_NAME, JWT_TOKEN };
