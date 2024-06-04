import { Service } from 'typedi';

import { Token } from '../Type/Definition/index.js';

/**
 * Configuration handler.
 */
@Service()
class WebSdkConfiguration {
  private token: Token | null;
  private apiHost: string;
  private elementCacheMaxEntries: number;
  private collectionCacheMaxEntries: number;
  private collectionPageSize: number;

  constructor() {
    this.token = null;
    this.apiHost = '';
    this.elementCacheMaxEntries = 100;
    this.collectionCacheMaxEntries = 50;
    this.collectionPageSize = 25;
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

  getElementCacheMaxEntries(): number {
    return this.elementCacheMaxEntries;
  }

  setElementCacheMaxEntries(value: number): WebSdkConfiguration {
    this.elementCacheMaxEntries = value;
    return this;
  }

  getCollectionCacheMaxEntries(): number {
    return this.collectionCacheMaxEntries;
  }

  setCollectionCacheMaxEntries(value: number): WebSdkConfiguration {
    this.collectionCacheMaxEntries = value;
    return this;
  }

  getCollectionPageSize(): number {
    return this.collectionPageSize;
  }

  setCollectionPageSize(value: number): WebSdkConfiguration {
    this.collectionPageSize = value;
    return this;
  }
}

export { WebSdkConfiguration };
