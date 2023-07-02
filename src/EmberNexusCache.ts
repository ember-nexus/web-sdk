import { v4 as uuidv4 } from 'uuid';

import DefaultLogger from './DefaultLogger.js';
import GetChildrenEndpoint from './Endpoint/GetChildrenEndpoint.js';
import GetElementEndpoint from './Endpoint/GetElementEndpoint.js';
import GetParentsEndpoint from './Endpoint/GetParentsEndpoint.js';
import GetRelatedEndpoint from './Endpoint/GetRelatedEndpoint.js';
import Options from './Options.js';
import CacheElement from './Type/CacheElement.js';
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
    private _options: OptionsInterface,
    private _logger: LoggerInterface,
    private getElementEndpoint: GetElementEndpoint,
    private getParentsEndpoint: GetParentsEndpoint,
    private getChildrenEndpoint: GetChildrenEndpoint,
    private getRelatedEndpoint: GetRelatedEndpoint,
  ) {}

  static create(logger: LoggerInterface | null = null, options: OptionsInterface | null = null): EmberNexusCache {
    if (logger === null) {
      logger = new DefaultLogger();
    }
    if (options === null) {
      options = new Options();
    }
    return new EmberNexusCache(
      options,
      logger,
      new GetElementEndpoint(logger, options),
      new GetParentsEndpoint(logger, options),
      new GetChildrenEndpoint(logger, options),
      new GetRelatedEndpoint(logger, options),
    );
  }

  async getElement(uuid: typeof uuidv4): Promise<Node | Relation> {
    const uuidAsString = uuid.toString();
    if (uuidAsString in this._cache) {
      if (this._cache[uuidAsString].element != null) {
        return this._cache[uuidAsString].element;
      }
    }
    await this.fetchElementFromApi(uuid);
    return this._cache[uuidAsString].element;
  }

  private async fetchElementFromApi(uuid: typeof uuidv4): Promise<void> {
    this._logger.debug(`Fetching element with UUID ${uuid.toString()}.`);
    const res = await this.getElementEndpoint.getElement(uuid);
    this.addElementToCache(res);
    this._logger.debug(`Fetched element with UUID ${uuid.toString()}.`);
  }

  async getRelated(uuid: typeof uuidv4): Promise<Array<Node | Relation>> {
    const uuidAsString = uuid.toString();
    if (uuidAsString in this._cache) {
      if (this._cache[uuidAsString].allRelatedLoaded == true) {
        return this.getElementsFromCache(this._cache[uuidAsString].related);
      }
    }
    await this.fetchAllRelatedFromApi(uuid);
    this._cache[uuidAsString].allRelatedLoaded = true;
    return this.getElementsFromCache(this._cache[uuidAsString].related);
  }

  private async fetchAllRelatedFromApi(uuid: typeof uuidv4): Promise<void> {
    // load first page directly
    this._logger.debug(`Fetching all related for element with UUID ${uuid.toString()}.`);
    const res = await this.getRelatedEndpoint.getRelated(uuid, 1);
    for (const element of [...res.nodes, ...res.relations]) {
      this.addElementToCache(element);
      this.markElementAsRelated(element.id, uuid);
    }
    // load remaining pages if they exist
    if (res.totalNodes == res.nodes.length) {
      return;
    }
    const promises = [];
    for (let page = 2; page <= Math.ceil(res.totalNodes / this._options.getPageSize()); page++) {
      promises.push(this.getRelatedEndpoint.getRelated(uuid, page));
    }
    await Promise.all(promises).then((values) => {
      for (const res of values) {
        for (const element of [...res.nodes, ...res.relations]) {
          this.addElementToCache(element);
          this.markElementAsRelated(element.id, uuid);
        }
      }
    });
    this._logger.debug(`Fetched all related for element with UUID ${uuid.toString()}.`);
  }

  private markElementAsRelated(elementUuid: typeof uuidv4, relatedUuid: typeof uuidv4): void {
    elementUuid = elementUuid.toString();
    relatedUuid = relatedUuid.toString();

    // add related to element
    if (!(elementUuid in this._cache)) {
      this._cache[elementUuid] = this.createNewCacheElement();
    }
    if (!this._cache[elementUuid].related.includes(relatedUuid)) {
      this._cache[elementUuid].related.push(relatedUuid);
    }

    // add element to related
    if (!(relatedUuid in this._cache)) {
      this._cache[relatedUuid] = this.createNewCacheElement();
    }
    if (!this._cache[relatedUuid].related.includes(elementUuid)) {
      this._cache[relatedUuid].related.push(elementUuid);
    }
  }

  async getParents(uuid: typeof uuidv4): Promise<Array<Node | Relation>> {
    const uuidAsString = uuid.toString();
    if (uuidAsString in this._cache) {
      if (this._cache[uuidAsString].allParentsLoaded == true) {
        return this.getElementsFromCache(this._cache[uuidAsString].parents);
      }
    }
    await this.fetchAllParentsFromApi(uuid);
    this._cache[uuidAsString].allParentsLoaded = true;
    return this.getElementsFromCache(this._cache[uuidAsString].parents);
  }

  private async fetchAllParentsFromApi(uuid: typeof uuidv4): Promise<void> {
    // load first page directly
    this._logger.debug(`Fetching all parents for element with UUID ${uuid.toString()}.`);
    const res = await this.getParentsEndpoint.getParents(uuid, 1);
    for (const element of [...res.nodes, ...res.relations]) {
      this.addElementToCache(element);
      this.markElementAsParent(element.id, uuid);
    }
    // load remaining pages if they exist
    if (res.totalNodes == res.nodes.length) {
      return;
    }
    const promises = [];
    for (let page = 2; page <= Math.ceil(res.totalNodes / this._options.getPageSize()); page++) {
      promises.push(this.getParentsEndpoint.getParents(uuid, page));
    }
    await Promise.all(promises).then((values) => {
      for (const res of values) {
        for (const element of [...res.nodes, ...res.relations]) {
          this.addElementToCache(element);
          this.markElementAsParent(element.id, uuid);
        }
      }
    });
    this._logger.debug(`Fetched all parents for element with UUID ${uuid.toString()}.`);
  }

  private markElementAsParent(elementUuid: typeof uuidv4, childUuid: typeof uuidv4): void {
    elementUuid = elementUuid.toString();
    childUuid = childUuid.toString();

    // add child to parent
    if (!(elementUuid in this._cache)) {
      this._cache[elementUuid] = this.createNewCacheElement();
    }
    if (!this._cache[elementUuid].children.includes(childUuid)) {
      this._cache[elementUuid].children.push(childUuid);
    }

    // add parent to child
    if (!(childUuid in this._cache)) {
      this._cache[childUuid] = this.createNewCacheElement();
    }
    if (!this._cache[childUuid].parents.includes(elementUuid)) {
      this._cache[childUuid].parents.push(elementUuid);
    }
  }

  async getChildren(uuid: typeof uuidv4): Promise<Array<Node | Relation>> {
    const uuidAsString = uuid.toString();
    if (uuidAsString in this._cache) {
      if (this._cache[uuidAsString].allChildrenLoaded == true) {
        return this.getElementsFromCache(this._cache[uuidAsString].children);
      }
    }
    await this.fetchAllChildrenFromApi(uuid);
    this._cache[uuidAsString].allChildrenLoaded = true;
    return this.getElementsFromCache(this._cache[uuidAsString].children);
  }

  private async fetchAllChildrenFromApi(uuid: typeof uuidv4): Promise<void> {
    // load first page directly
    this._logger.debug(`Fetching all children for element with UUID ${uuid.toString()}.`);
    const res = await this.getChildrenEndpoint.getChildren(uuid, 1);
    for (const element of [...res.nodes, ...res.relations]) {
      this.addElementToCache(element);
      this.markElementAsChild(element.id, uuid);
    }
    // load remaining pages if they exist
    if (res.totalNodes == res.nodes.length) {
      return;
    }
    const promises = [];
    for (let page = 2; page <= Math.ceil(res.totalNodes / this._options.getPageSize()); page++) {
      promises.push(this.getChildrenEndpoint.getChildren(uuid, page));
    }
    await Promise.all(promises).then((values) => {
      for (const res of values) {
        for (const element of [...res.nodes, ...res.relations]) {
          this.addElementToCache(element);
          this.markElementAsChild(element.id, uuid);
        }
      }
    });
    this._logger.debug(`Fetched all children for element with UUID ${uuid.toString()}.`);
  }

  private markElementAsChild(elementUuid: typeof uuidv4, parentUuid: typeof uuidv4): void {
    elementUuid = elementUuid.toString();
    parentUuid = parentUuid.toString();

    // add parent to child
    if (!(elementUuid in this._cache)) {
      this._cache[elementUuid] = this.createNewCacheElement();
    }
    if (!this._cache[elementUuid].parents.includes(parentUuid)) {
      this._cache[elementUuid].parents.push(parentUuid);
    }

    // add child to parent
    if (!(parentUuid in this._cache)) {
      this._cache[parentUuid] = this.createNewCacheElement();
    }
    if (!this._cache[parentUuid].children.includes(elementUuid)) {
      this._cache[parentUuid].children.push(elementUuid);
    }
  }

  debug(): void {
    this._logger.debug('Debug wip.');
  }

  private createNewCacheElement(element: Node | Relation | null = null): CacheElement {
    return {
      element: element,

      parents: [],
      allParentsLoaded: false,

      children: [],
      allChildrenLoaded: false,

      related: [],
      allRelatedLoaded: false,

      firstLoaded: new Date(),
      lastUpdated: new Date(),
    };
  }

  private addElementToCache(element: Node | Relation): void {
    const elementId = element.id.toString();
    if (elementId in this._cache) {
      this._cache[elementId].element = element;
      this._cache[elementId].lastUpdated = new Date();
    } else {
      this._cache[elementId] = this.createNewCacheElement(element);
    }
  }

  private getElementsFromCache(elementIds: Array<typeof uuidv4>): Array<Node | Relation> {
    const result = [];
    for (let elementId of elementIds) {
      elementId = elementId.toString();
      if (elementId in this._cache) {
        const element = this._cache[elementId].element;
        if (element != null) {
          result.push(element);
        }
      }
    }
    return result;
  }
}

export default EmberNexusCache;
