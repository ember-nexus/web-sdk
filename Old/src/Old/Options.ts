import OptionsInterface from './Type/OptionsInterface.js';

export default class Options implements OptionsInterface {
  private apiHost = 'http://localhost/';
  private pageSize = 25;
  private token: string | null = null;
  private cacheActive = true;

  getApiHost(): string {
    return this.apiHost;
  }

  setApiHost(apiHost: string): Options {
    this.apiHost = apiHost;
    return this;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  setPageSize(pageSize: number): Options {
    this.pageSize = pageSize;
    return this;
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string | null): Options {
    this.token = token;
    return this;
  }

  isCacheActive(): boolean {
    return this.cacheActive;
  }

  setCacheActive(isCacheActive: boolean): Options {
    this.cacheActive = isCacheActive;
    return this;
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }
}
