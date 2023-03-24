import { AxiosError } from 'axios';

import { AxiosSummaryObject } from '../type/axios-summary-object.js';

export function axiosErrorToSummaryObject(error: AxiosError): AxiosSummaryObject {
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
