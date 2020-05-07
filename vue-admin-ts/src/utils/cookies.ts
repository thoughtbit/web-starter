import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

const inFifteenMinutes = new Date(new Date().getTime() + 120 * 60 * 1000);

// 用户鉴权
export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);
export const setAccessToken = (token: string) => Cookies.set(ACCESS_TOKEN_KEY, token, {
  expires: inFifteenMinutes
});
export const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);
export const setRefreshToken = (token: string) => Cookies.set(REFRESH_TOKEN_KEY, token, {
  expires: inFifteenMinutes
});
export const removeRefreshToken = () => Cookies.remove(REFRESH_TOKEN_KEY);

