import OptionsInterface from './Type/OptionsInterface.js';

export default class Options implements OptionsInterface {
  private apiHost = 'http://localhost/';
  private pageSize = 25;
  private token: string | null = null;
  private cacheActive = true;

  getApiHost(): string {
    return this.apiHost;
  }

  setApiHost(apiHost: string) {
    this.apiHost = apiHost;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  isCacheActive(): boolean {
    return this.cacheActive;
  }

  setCacheActive(isCacheActive: boolean) {
    this.cacheActive = isCacheActive;
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }
}
