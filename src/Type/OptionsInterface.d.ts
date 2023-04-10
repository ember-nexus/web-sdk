interface OptionsInterface {
  getApiHost(): string;
  setApiHost(apiHost: string): OptionsInterface;
  isLoggedIn(): boolean;
  getToken(): string;
  setToken(token: string): OptionsInterface;
  isCacheActive(): boolean;
  setCacheActive(isCacheActive: boolean): OptionsInterface;
  getPageSize(): number;
  setPageSize(pageSize: number): OptionsInterface;
}

export default OptionsInterface;
