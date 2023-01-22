import qs from 'qs';
import request from './request';

const UserApiService = {
  login: (data: Recordable) => {
    return request({
      url: '/api/user/login',
      method: 'post',
      data: data,
    });
  },
  register: (data: Recordable) => {
    return request({
      url: '/api/user/register',
      method: 'post',
      data: data,
    });
  },
  forget: (data: Recordable) => {
    return request({
      url: '/api/user/forget',
      method: 'post',
      data: data,
    });
  },
  logout: () => {
    return request({
      url: '/api/user/logout',
      method: 'post',
    });
  },
};

const CommonApiService = {};

export default {
  ...CommonApiService,
  ...UserApiService,
};
