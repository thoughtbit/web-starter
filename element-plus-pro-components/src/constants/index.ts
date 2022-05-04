const MODE = import.meta.env.MODE;
const DEBUG = process.env.NODE_ENV !== "production";
const APP_BASE_URL = import.meta.env.VITE_APP_BASE_API;

export { MODE, DEBUG, APP_BASE_URL };
