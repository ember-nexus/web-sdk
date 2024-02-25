import { Service } from 'typedi';

import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

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
    this.logger.debug('lol');
  }
}

export { FetchHelper };
