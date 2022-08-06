import { useAxios } from "@vueuse/integrations/useAxios";
import axios, { AxiosRequestConfig } from "axios";

// create an axios instance
const instance = axios.create({
  withCredentials: false,
  timeout: 5000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // const token = store.state.user.token;

    // if (token) {
    //   // let each request carry token
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      // 提示框

      // 412: Token expired;
      if (res.code === 412) {
        // store.dispatch('user/userLogout');
      }
      return Promise.reject(res.msg || "Error");
    }
    return res;
  },
  (error) => {
    // 提示框 error.message
    return Promise.reject(error.message);
  },
);

function useAxiosApi(url: string, config: AxiosRequestConfig) {
  return useAxios(url, config, instance);
}

export default useAxiosApi;
