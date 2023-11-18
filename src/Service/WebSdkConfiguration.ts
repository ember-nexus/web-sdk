import { Service } from 'typedi';

import { Token } from '~/Type/Definition/Token';

@Service()
class WebSdkConfiguration {
  private token: Token | null;
  private apiHost: string;

  constructor() {
    this.token = null;
    this.apiHost = '';
  }

  hasToken(): boolean {
    return this.token !== null;
  }
  getToken(): Token | null {
    return this.token;
  }
  setToken(token: Token | null): WebSdkConfiguration {
    this.token = token;
    return this;
  }

  getApiHost(): string {
    return this.apiHost;
  }
  setApiHost(apiHost: string): WebSdkConfiguration {
    this.apiHost = apiHost;
    return this;
  }
}

export { WebSdkConfiguration };
