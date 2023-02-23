export class Options {
  private static instance: Options;

  private _isCacheActive: boolean = true;
  private _apiHost: string = 'http://neo4j-php-nginx/';
  private _pageSize: number = 25;

  private constructor() {}

  public static getInstance(): Options {
    if (!Options.instance) {
      Options.instance = new Options();
    }

    return Options.instance;
  }

  get isCacheActive(): boolean {
    return this._isCacheActive;
  }

  set isCacheActive(value: boolean) {
    this._isCacheActive = value;
  }

  get apiHost(): string {
    return this._apiHost;
  }

  set apiHost(value: string) {
    this._apiHost = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }
}
