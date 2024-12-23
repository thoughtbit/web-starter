import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ajax } from '@/services';

export type GetRequest = AxiosRequestConfig | null | any;

interface Return<Data, Error>
  extends Pick<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'isLoading' | 'isValidating' | 'error' | 'mutate'> {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
  fallbackData?: Data;
}

export default function useRequestSWR<Data = unknown, Error = unknown>(
  request: GetRequest,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request && JSON.stringify(request),
    () => ajax.request(request!),
    {
      ...config,
      fallbackData: fallbackData && {
        status: 200,
        statusText: 'InitialData',
        config: request!,
        headers: {},
        data: fallbackData,
      },
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
