import { AxiosError } from 'axios';

import ProblemJson from '../Type/ProblemJson.js';

function getProblemJsonFromAxiosError(error: AxiosError): ProblemJson | null {
  if (!error.response) {
    return null;
  }
  if (!error.response.headers) {
    return null;
  }
  if (error.response.headers['content-type'] !== 'application/problem+json') {
    return null;
  }
  if (!('data' in error.response)) {
    return null;
  }
  const data = error.response.data;
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  let type = null;
  if ('type' in data) {
    type = String(data.type);
  }

  let title = null;
  if ('title' in data) {
    title = String(data.title);
  }

  let status = null;
  if ('status' in data) {
    status = Number(data.status);
  }

  let detail = null;
  if ('detail' in data) {
    detail = String(data.detail);
  }

  let instance = null;
  if ('instance' in data) {
    instance = String(data.instance);
  }

  return {
    type,
    title,
    status,
    detail,
    instance,
  };
}

export default function handleEndpointError(context: string, originalError: AxiosError | Error): Error {
  let newErrorMessage = `${context}: ${originalError.message}`;
  if (originalError instanceof AxiosError) {
    const problemJson = getProblemJsonFromAxiosError(originalError);
    newErrorMessage = `${context}: ${problemJson.status} ${problemJson.title} - ${problemJson.detail}`;
  }

  return new Error(newErrorMessage, {
    cause: originalError,
  });
}
