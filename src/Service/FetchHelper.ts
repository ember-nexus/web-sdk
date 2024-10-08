import { Container, Service } from 'typedi';

import { Logger } from './Logger.js';
import { WebSdkConfiguration } from './WebSdkConfiguration.js';
import {
  Response401UnauthorizedError,
  Response403ForbiddenError,
  Response404NotFoundError,
  Response429TooManyRequestsError,
  ResponseError,
} from '../Error/index.js';
import { HttpRequestMethod } from '../Type/Enum/index.js';

/**
 * Collection of different fetch helper methods.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class FetchHelper {
  constructor(private logger: Logger) {}

  createResponseErrorFromBadResponse(response: Response, data: Record<string, unknown>): ResponseError {
    let errorInstance: ResponseError | null = null;

    if (response.status === 401) {
      errorInstance = new Response401UnauthorizedError('Server returned 401 unauthorized.');
    }
    if (response.status === 403) {
      errorInstance = new Response403ForbiddenError('Server returned 403 forbidden.');
    }
    if (response.status === 404) {
      errorInstance = new Response404NotFoundError('Server returned 404 not found.');
    }
    if (response.status === 429) {
      errorInstance = new Response429TooManyRequestsError('Server returned 429 too many requests.');
    }

    if (errorInstance === null) errorInstance = new ResponseError('Generic response error.');

    if ('type' in data) {
      errorInstance.setType(String(data.type));
    }
    if ('title' in data) {
      errorInstance.setTitle(String(data.title));
    }
    if ('detail' in data) {
      errorInstance.setDetail(String(data.detail));
    }
    if ('status' in data && errorInstance.getStatus() === null) {
      errorInstance.setStatus(Number(data.status));
    }

    return errorInstance;
  }

  addAuthorizationHeader(headers: HeadersInit): void {
    if (Container.get(WebSdkConfiguration).hasToken()) {
      // eslint-disable-next-line dot-notation
      headers['Authorization'] = `Bearer ${Container.get(WebSdkConfiguration).getToken()}`;
    }
  }

  addAcceptJsonAndProblemJsonHeader(headers: HeadersInit): void {
    // eslint-disable-next-line dot-notation
    headers['Accept'] = 'application/json, application/problem+json';
  }

  addContentTypeJsonHeader(headers: HeadersInit): void {
    headers['Content-Type'] = 'application/json';
  }

  getDefaultGetOptions(): RequestInit {
    const headers = {};
    this.addAuthorizationHeader(headers);
    this.addAcceptJsonAndProblemJsonHeader(headers);
    return {
      method: HttpRequestMethod.GET,
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
  }

  getDefaultDeleteOptions(): RequestInit {
    const headers = {};
    this.addAuthorizationHeader(headers);
    this.addAcceptJsonAndProblemJsonHeader(headers);
    return {
      method: HttpRequestMethod.DELETE,
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
  }

  getDefaultPostOptions(body: string): RequestInit {
    const headers = {};
    this.addAuthorizationHeader(headers);
    this.addAcceptJsonAndProblemJsonHeader(headers);
    this.addContentTypeJsonHeader(headers);
    return {
      method: HttpRequestMethod.POST,
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body,
    };
  }

  getDefaultPatchOptions(body: string): RequestInit {
    const headers = {};
    this.addAuthorizationHeader(headers);
    this.addAcceptJsonAndProblemJsonHeader(headers);
    this.addContentTypeJsonHeader(headers);
    return {
      method: HttpRequestMethod.PATCH,
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body,
    };
  }

  getDefaultPutOptions(body: string): RequestInit {
    const headers = {};
    this.addAuthorizationHeader(headers);
    this.addAcceptJsonAndProblemJsonHeader(headers);
    this.addContentTypeJsonHeader(headers);
    return {
      method: HttpRequestMethod.PUT,
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body,
    };
  }

  buildUrl(url: string): string {
    return `${Container.get(WebSdkConfiguration).getApiHost()}${url}`;
  }

  runWrappedFetch(url: string, init?: RequestInit | undefined): Promise<Response> {
    url = `${Container.get(WebSdkConfiguration).getApiHost()}${url}`;
    this.logger.debug(`Executing HTTP ${init?.method ?? '-'} request against url ${url} .`);
    return fetch(url, init);
  }
}

export { FetchHelper };
