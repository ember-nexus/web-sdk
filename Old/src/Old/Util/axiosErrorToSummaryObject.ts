import { AxiosError } from 'axios';

import AxiosSummaryObject from '../Type/AxiosSummaryObject.js';

export default function axiosErrorToSummaryObject(error: AxiosError): AxiosSummaryObject {
  const errorObject = {
    request: null,
    response: null,
  };
  if (!(error instanceof AxiosError)) {
    return errorObject;
  }
  if (error.request) {
    errorObject.request = {
      method: error.request.method,
      path: error.request.path,
      params: error.request.params,
      headers: error.request.headers,
      data: error.request.data,
    };
  }
  if (error.response) {
    errorObject.response = {
      status: error.response.status,
      headers: error.response.headers,
      data: error.response.data,
    };
  }
  return errorObject;
}
