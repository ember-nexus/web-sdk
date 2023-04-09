interface OptionsInterface {
  getApiHost(): string;
  setApiHost(apiHost: string);
  isLoggedIn(): boolean;
  getToken(): string;
  setToken(token: string);
  isCacheActive(): boolean;
  setCacheActive(isCacheActive: boolean);
  getPageSize(): number;
  setPageSize(pageSize: number);
}

export default OptionsInterface;
