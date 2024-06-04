import { Token } from './Token.js';

interface WebSdkConfigurationInterface {
  hasToken(): boolean;
  getToken(): Token;
  setToken(token: Token): WebSdkConfigurationInterface;

  getApiHost(): string;
  setApiHost(apiHost: string): WebSdkConfigurationInterface;
}

export { WebSdkConfigurationInterface };
