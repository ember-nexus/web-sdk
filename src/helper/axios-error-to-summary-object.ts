import { AxiosError } from 'axios';

export function axiosErrorToSummaryObject(error: AxiosError): Object {
  return {
    request: {
      method: error.request.method ?? null,
      path: error.request.path ?? null,
      params: error.request.params ?? null,
      headers: error.request.getHeaders() ?? null,
      data: error.request.data ?? null,
    },
    response: {
      status: error.response.status ?? null,
      headers: error.response.headers ?? null,
      data: error.response.data ?? null,
    },
  };
}
