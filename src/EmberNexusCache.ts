import { v4 as uuidv4 } from 'uuid';

import DefaultLogger from './DefaultLogger.js';
import GetChildrenEndpoint from './Endpoint/GetChildrenEndpoint.js';
import GetElementEndpoint from './Endpoint/GetElementEndpoint.js';
import GetParentsEndpoint from './Endpoint/GetParentsEndpoint.js';
import Options from './Options.js';
import AccessStrategy from './Type/AccessStrategy.js';
import CacheElement from './Type/CacheElement.js';
import CollectionAccessStrategy from './Type/CollectionAccessStrategy.js';
import LoggerInterface from './Type/LoggerInterface.js';
import Node from './Type/Node.js';
import OptionsInterface from './Type/OptionsInterface.js';
import Relation from './Type/Relation.js';

interface Cache {
  [key: string]: CacheElement;
}

class EmberNexusCache {
  private _cache: Cache = {};

  constructor(
    private logger: LoggerInterface,
    private getElementEndpoint: GetElementEndpoint,
    private getParentsEndpoint: GetParentsEndpoint,
    private getChildrenEndpoint: GetChildrenEndpoint,
  ) {}

  static create(logger: LoggerInterface | null = null, options: OptionsInterface | null = null): EmberNexusCache {
    if (logger === null) {
      logger = new DefaultLogger();
    }
    if (options === null) {
      options = new Options();
    }
    return new EmberNexusCache(
      logger,
      new GetElementEndpoint(logger, options),
      new GetParentsEndpoint(logger, options),
      new GetChildrenEndpoint(logger, options),
    );
  }

  debug(): void {
    console.log('wip debug');
  }

  private createNewCacheElement(element: Node | Relation | null = null): CacheElement {
    return {
      element: element,

      parents: [],
      nextParentsPage: 0,

      children: [],
      nextChildrenPage: 0,

      related: [],
      nextRelatedPage: 0,

      firstLoaded: new Date(),
      lastUpdated: new Date(),
    };
  }

  private getElementsFromCache(elementIds: Array<typeof uuidv4>): Array<Node | Relation> {
    const result = [];
    for (const i in elementIds) {
      const elementId = elementIds[i].toString();
      if (elementId in this._cache) {
        const element = this._cache[elementId].element;
        if (element != null) {
          result.push(element);
        }
      }
    }
    return result;
  }

  async getElement(
    uuid: typeof uuidv4,
    accessStrategy: AccessStrategy = AccessStrategy.CacheFirstThenAPI,
  ): Promise<Node | Relation> {
    const uuidAsString = uuid.toString();
    return new Promise((resolve, reject) => {
      if (
        uuidAsString in this._cache &&
        [AccessStrategy.CacheFirstThenAPI, AccessStrategy.CacheOnly].includes(accessStrategy)
      ) {
        this.logger.debug(`Returned element with identifier ${uuid.toString()} from cache.`);
        resolve(this._cache[uuidAsString].element);
        return;
      }
      if (accessStrategy == AccessStrategy.CacheOnly) {
        reject(new Error(`Unable to find element with identifier ${uuid.toString()} in cache.`));
        return;
      }
      this.getElementEndpoint
        .getElement(uuid)
        .then((element) => {
          if (uuidAsString in this._cache) {
            this._cache[uuidAsString].element = element;
            this._cache[uuidAsString].lastUpdated = new Date();
          } else {
            this._cache[uuidAsString] = this.createNewCacheElement(element);
          }
          resolve(element);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getParents(
    uuid: typeof uuidv4,
    accessStrategy: AccessStrategy = AccessStrategy.CacheFirstThenAPI,
    collectionAccessStrategy: CollectionAccessStrategy = CollectionAccessStrategy.All,
  ): Promise<Array<Node | Relation>> {
    const uuidAsString = uuid.toString();
    return new Promise(async (resolve, reject) => {
      const isInCache = uuidAsString in this._cache;
      const cacheElement = isInCache ? this._cache[uuidAsString] : this.createNewCacheElement();
      const hasSomeParents = isInCache ? cacheElement.parents.length > 0 || cacheElement.nextParentsPage != 0 : false;
      const hasAllParents = isInCache ? cacheElement.nextParentsPage == null : false;

      if (accessStrategy == AccessStrategy.CacheOnly) {
        if (collectionAccessStrategy == CollectionAccessStrategy.All && !hasAllParents) {
          reject(new Error('Not all parents are in cache.'));
          return;
        }
        if (!hasSomeParents) {
          reject(new Error('No parent elements are in cache.'));
          return;
        }
        resolve(this.getElementsFromCache(cacheElement.parents));
        return;
      }

      if (accessStrategy == AccessStrategy.CacheFirstThenAPI) {
        if (collectionAccessStrategy == CollectionAccessStrategy.All && hasAllParents) {
          resolve(this.getElementsFromCache(cacheElement.parents));
          return;
        }
        if (collectionAccessStrategy == CollectionAccessStrategy.Any && hasSomeParents) {
          resolve(this.getElementsFromCache(cacheElement.parents));
          return;
        }
      }

      // cache was unsuccessful, load elements from API
      let page = cacheElement.nextParentsPage;

      if (page == null) {
        reject(new Error('Logic problem, page should not be null'));
        return;
      }

      while (page != null) {
        const res = await this.getParentsEndpoint.getParents(uuid, page);
        const nodesAndRelations = [...res.nodes, ...res.relations];
        for (const i in nodesAndRelations) {
          const tmpElement = nodesAndRelations[i];
          const tmpElementId = tmpElement.id;
          const tmpElementIdAsString = tmpElementId.toString();
          if (tmpElementIdAsString in this._cache) {
            this._cache[tmpElementIdAsString].element = tmpElement;
            this._cache[tmpElementIdAsString].lastUpdated = new Date();
          } else {
            this._cache[tmpElementIdAsString] = this.createNewCacheElement(tmpElement);
          }
          this._cache[tmpElementIdAsString].children.push(uuidAsString);
          if (!(uuidAsString in this._cache)) {
            this._cache[uuidAsString] = this.createNewCacheElement();
          }
          if (!this._cache[uuidAsString].parents.includes(tmpElementIdAsString)) {
            this._cache[uuidAsString].parents.push(tmpElementIdAsString);
          }
        }
        if (res.links.next != null) {
          page++;
        } else {
          page = null;
        }
      }
      resolve(this.getElementsFromCache(this._cache[uuidAsString].parents));
    });
  }

  async getChildren(
    uuid: typeof uuidv4,
    accessStrategy: AccessStrategy = AccessStrategy.CacheFirstThenAPI,
    collectionAccessStrategy: CollectionAccessStrategy = CollectionAccessStrategy.All,
  ): Promise<Array<Node | Relation>> {
    const uuidAsString = uuid.toString();
    return new Promise((resolve, reject) => {
      const isInCache = uuidAsString in this._cache;
      const cacheElement = isInCache ? this._cache[uuidAsString] : this.createNewCacheElement();
      const hasSomeChildren = isInCache ? cacheElement.parents.length > 0 || cacheElement.nextChildrenPage != 0 : false;
      const hasAllChildren = isInCache ? cacheElement.nextChildrenPage == null : false;

      if (accessStrategy == AccessStrategy.CacheOnly) {
        if (collectionAccessStrategy == CollectionAccessStrategy.All && !hasAllChildren) {
          reject(new Error('Not all children are in cache.'));
          return;
        }
        if (!hasSomeChildren) {
          reject(new Error('No child elements are in cache.'));
          return;
        }
        resolve(this.getElementsFromCache(cacheElement.children));
        return;
      }

      if (accessStrategy == AccessStrategy.CacheFirstThenAPI) {
        if (collectionAccessStrategy == CollectionAccessStrategy.All && hasAllChildren) {
          resolve(this.getElementsFromCache(cacheElement.children));
          return;
        }
        if (collectionAccessStrategy == CollectionAccessStrategy.Any && hasSomeChildren) {
          resolve(this.getElementsFromCache(cacheElement.children));
          return;
        }
      }

      // cache was unsuccessful, load elements from API
      let page = cacheElement.nextChildrenPage;

      if (page == null) {
        reject(new Error('Logic problem, page should not be null'));
        return;
      }

      const fetchChildren = async (): Promise<void> => {
        while (page != null) {
          const res = await this.getChildrenEndpoint.getChildren(uuid, page);
          const nodesAndRelations = [...res.nodes, ...res.relations];
          for (const i in nodesAndRelations) {
            const tmpElement = nodesAndRelations[i];
            const tmpElementId = tmpElement.id;
            const tmpElementIdAsString = tmpElementId.toString();
            if (tmpElementIdAsString in this._cache) {
              this._cache[tmpElementIdAsString].element = tmpElement;
              this._cache[tmpElementIdAsString].lastUpdated = new Date();
            } else {
              this._cache[tmpElementIdAsString] = this.createNewCacheElement(tmpElement);
            }
            this._cache[tmpElementIdAsString].parents.push(uuidAsString);
            if (!(uuidAsString in this._cache)) {
              this._cache[uuidAsString] = this.createNewCacheElement();
            }
            if (!this._cache[uuidAsString].children.includes(tmpElementIdAsString)) {
              this._cache[uuidAsString].children.push(tmpElementIdAsString);
            }
          }
          if (res.links.next != null && collectionAccessStrategy == CollectionAccessStrategy.All) {
            page++;
          } else {
            page = null;
          }
        }
        resolve(this.getElementsFromCache(this._cache[uuidAsString].children));
      };
      fetchChildren();
    });
  }
}

export default EmberNexusCache;
