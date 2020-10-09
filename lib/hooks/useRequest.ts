import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthAPI from 'lib/api/auth';
import { SERVER_BASE_URL } from 'lib/utils/constant';
import useSWR, { ConfigInterface, responseInterface } from 'swr';


export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { initialData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
  const { data: response, error, isValidating, revalidate, mutate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(
    request && JSON.stringify(request),
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => instance(request!),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config: request!,
        headers: {},
        data: initialData,
      },
    },
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
  };
}

const instance = axios.create({
  baseURL: SERVER_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(']-----] axios.interceptors.request [-----[', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(']-----] axios.interceptors.error [-----[', error.response);
    if (error.response.status == 401) {
      console.log(
        ']-----] axios.interceptors.error.status [-----[',
        error.response.status,
      );
      AuthAPI.signOut();
    }

    return Promise.reject(error);
  },
);
