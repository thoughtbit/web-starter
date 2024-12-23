import qs from 'qs';
import useSWR from 'swr';
import ajax from './request';

const UserApiService = {
  login: async (data: Recordable) => {
    return await ajax.post('/login', data);
  },
  logout: async () => {
    return await ajax.post('/logout');
  },

  getUsers: (url: string) => {
    return ajax.get(url);
  },
};

const CommonApiService = {};

export const useQueryPosts = (params: Record<string, any>) => {
  return useSWR(
    `/post/list?${qs.stringify(params, {
      skipNulls: true,
    })}`,
    ajax.get
  );
};

export const useQueryUsers = (params: Record<string, any>) => {
  const apiUrl = `/users?${qs.stringify(params)}`;
  const { data, error, mutate } = useSWR(apiUrl, ajax.get);
  return {
    data,
    isLoading: !data && !error,
    error,
    mutate,
  };
};

export default {
  ...CommonApiService,
  ...UserApiService,
};
