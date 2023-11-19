import { Service } from 'typedi';

import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { HttpRequestMethod } from '~/Type/Enum/HttpRequestMethod';

@Service()
class FetchHelper {
  constructor(
    private logger: Logger,
    private sdkConfiguration: WebSdkConfiguration,
  ) {}

  addAuthorizationHeader(headers: HeadersInit): void {
    if (this.sdkConfiguration.hasToken()) {
      headers['Authorization'] = `Bearer ${this.sdkConfiguration.getToken()}`;
    }
  }

  addAcceptJsonAndProblemJsonHeader(headers: HeadersInit): void {
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

  runWrappedFetch(url: string, init?: RequestInit | undefined): Promise<Response> {
    url = `${this.sdkConfiguration.getApiHost()}${url}`;
    this.logger.debug(`Executing HTTP ${init?.method ?? '-'} request against url ${url} .`);
    return fetch(url, init);
  }
}

export { FetchHelper };
