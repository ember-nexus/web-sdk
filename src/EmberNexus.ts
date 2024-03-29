import 'reflect-metadata';

import { LRUCache } from 'lru-cache';
import { Container } from 'typedi';

import { DeleteElementEndpoint } from '~/Endpoint/Element/DeleteElementEndpoint';
import { GetElementChildrenEndpoint } from '~/Endpoint/Element/GetElementChildrenEndpoint';
import { GetElementEndpoint } from '~/Endpoint/Element/GetElementEndpoint';
import { GetElementParentsEndpoint } from '~/Endpoint/Element/GetElementParentsEndpoint';
import { GetElementRelatedEndpoint } from '~/Endpoint/Element/GetElementRelatedEndpoint';
import { GetIndexEndpoint } from '~/Endpoint/Element/GetIndexEndpoint';
import { PatchElementEndpoint } from '~/Endpoint/Element/PatchElementEndpoint';
import { PostElementEndpoint } from '~/Endpoint/Element/PostElementEndpoint';
import { PostIndexEndpoint } from '~/Endpoint/Element/PostIndexEndpoint';
import { PutElementEndpoint } from '~/Endpoint/Element/PutElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { createChildrenCollectionIdentifier } from '~/Type/Definition/ChildrenCollectionIdentifier';
import { Collection } from '~/Type/Definition/Collection';
import { Data } from '~/Type/Definition/Data';
import { createIndexCollectionIdentifier } from '~/Type/Definition/IndexCollectionIdentifier';
import { Node } from '~/Type/Definition/Node';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';
import { createParentsCollectionIdentifier } from '~/Type/Definition/ParentsCollectionIdentifier';
import { createRelatedCollectionIdentifier } from '~/Type/Definition/RelatedCollectionIdentifier';
import { Relation } from '~/Type/Definition/Relation';
import { RelationWithOptionalId } from '~/Type/Definition/RelationWithOptionalId';
import { Uuid } from '~/Type/Definition/Uuid';

class EmberNexus {
  private elementCache: LRUCache<Uuid, Node | Relation>;
  private collectionCache: LRUCache<string, Collection>;

  constructor() {
    this.elementCache = new LRUCache<Uuid, Node | Relation>({
      max: Container.get(WebSdkConfiguration).getElementCacheMaxEntries(),
    });
    this.collectionCache = new LRUCache<string, Collection>({
      max: Container.get(WebSdkConfiguration).getCollectionCacheMaxEntries(),
    });
  }

  /**
   * Returns one node or relation through its Uuid.
   *
   * The element is directly returned if it is already in the cache. Otherwise, a fetch call against Ember Nexus API is
   * started.
   *
   * **Note**: The browser might also cache the API's response if it contains an ETag header.
   *
   * @param elementUuid The Uuid of the requested element.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const elementUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * const element = await emberNexus.getElement(elementUuid);
   * ```
   *
   * @see [Web SDK: Get element endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/get-element)
   * @see [Ember Nexus API: Get element endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-element)
   */
  getElement(elementUuid: Uuid): Promise<Node | Relation> {
    return new Promise<Node | Relation>((resolve) => {
      if (this.elementCache.has(elementUuid)) {
        const element = this.elementCache.get(elementUuid);
        if (element !== undefined) {
          return resolve(element);
        }
      }
      return resolve(
        Container.get(GetElementEndpoint)
          .getElement(elementUuid)
          .then((element) => {
            this.elementCache.set(elementUuid, element);
            return element;
          }),
      );
    });
  }

  /**
   * Returns children nodes and all relations between the specified parent and the returned children.
   *
   * The collection is directly returned if it is already in the cache. Otherwise, a fetch call against Ember Nexus API
   * is started.
   *
   * **Note**: The browser might also cache the API's response, if it contains an ETag header.
   *
   * @param parentUuid The Uuid of the parent node.
   * @param page The number of the page to be returned. The first page has the number 1.
   * @param pageSize The maximum number of elements one page should contain. If null, the default size is used.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const parentUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * const childrenCollection = await emberNexus.getElementChildren(parentUuid);
   * ```
   *
   * @see [Web SDK: Get element children endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/get-element)
   * @see [Ember Nexus API: Get element children endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-children)
   */
  getElementChildren(parentUuid: Uuid, page: number = 1, pageSize: number | null = null): Promise<Collection> {
    if (pageSize === null) {
      pageSize = Container.get(WebSdkConfiguration).getCollectionPageSize();
    }
    const collectionCacheKey = createChildrenCollectionIdentifier(parentUuid, page, pageSize);
    return new Promise<Collection>((resolve) => {
      if (this.collectionCache.has(collectionCacheKey)) {
        const collection = this.collectionCache.get(collectionCacheKey);
        if (collection !== undefined) {
          return resolve(collection);
        }
      }
      return resolve(
        Container.get(GetElementChildrenEndpoint)
          .getElementChildren(parentUuid, page, pageSize as number)
          .then((collection) => {
            this.collectionCache.set(collectionCacheKey, collection);
            return collection;
          }),
      );
    });
  }

  /**
   * Returns parent nodes and all relations between the specified child and the returned parents.
   *
   * The collection is directly returned if it is already in the cache. Otherwise, a fetch call against Ember Nexus API
   * is started.
   *
   * **Note**: The browser might also cache the API's response, if it contains an ETag header.
   *
   * @param childUuid The Uuid of the child node.
   * @param page The number of the page to be returned. The first page has the number 1.
   * @param pageSize The maximum number of elements one page should contain. If null, the default size is used.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const childUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * const parentsCollection = await emberNexus.getElementParents(childUuid);
   * ```
   *
   * @see [Web SDK: Get element parents endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/get-element)
   * @see [Ember Nexus API: Get element parents endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-parents)
   */
  getElementParents(childUuid: Uuid, page: number = 1, pageSize: number | null = null): Promise<Collection> {
    if (pageSize === null) {
      pageSize = Container.get(WebSdkConfiguration).getCollectionPageSize();
    }
    const collectionCacheKey = createParentsCollectionIdentifier(childUuid, page, pageSize);
    return new Promise<Collection>((resolve) => {
      if (this.collectionCache.has(collectionCacheKey)) {
        const collection = this.collectionCache.get(collectionCacheKey);
        if (collection !== undefined) {
          return resolve(collection);
        }
      }
      return resolve(
        Container.get(GetElementParentsEndpoint)
          .getElementParents(childUuid, page, pageSize as number)
          .then((collection) => {
            this.collectionCache.set(collectionCacheKey, collection);
            return collection;
          }),
      );
    });
  }

  /**
   * Returns related nodes and all relations between the specified center and the returned nodes.
   *
   * The collection is directly returned if it is already in the cache. Otherwise, a fetch call against Ember Nexus API
   * is started.
   *
   * **Note**: The browser might also cache the API's response, if it contains an ETag header.
   *
   * @param centerUuid The Uuid of the center node.
   * @param page The number of the page to be returned. The first page has the number 1.
   * @param pageSize The maximum number of elements one page should contain. If null, the default size is used.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const centerUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * const relatedCollection = await emberNexus.getElementRelated(centerUuid);
   * ```
   *
   * @see [Web SDK: Get element related endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/get-element)
   * @see [Ember Nexus API: Get element related endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-related)
   */
  getElementRelated(centerUuid: Uuid, page: number = 1, pageSize: number | null = null): Promise<Collection> {
    if (pageSize === null) {
      pageSize = Container.get(WebSdkConfiguration).getCollectionPageSize();
    }
    const collectionCacheKey = createRelatedCollectionIdentifier(centerUuid, page, pageSize);
    return new Promise<Collection>((resolve) => {
      if (this.collectionCache.has(collectionCacheKey)) {
        const collection = this.collectionCache.get(collectionCacheKey);
        if (collection !== undefined) {
          return resolve(collection);
        }
      }
      return resolve(
        Container.get(GetElementRelatedEndpoint)
          .getElementRelated(centerUuid, page, pageSize as number)
          .then((collection) => {
            this.collectionCache.set(collectionCacheKey, collection);
            return collection;
          }),
      );
    });
  }

  /**
   * Returns all nodes on the root level.
   *
   * As this collection only returns nodes, no relations will be returned.
   *
   * The collection is directly returned if it is already in the cache. Otherwise, a fetch call against Ember Nexus API
   * is started.
   *
   * **Note**: The browser might also cache the API's response, if it contains an ETag header.
   *
   * @param page The number of the page to be returned. The first page has the number 1.
   * @param pageSize The maximum number of elements one page should contain. If null, the default size is used.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const indexCollection = await emberNexus.getIndex();
   * ```
   *
   * @see [Web SDK: Get index endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/get-index)
   * @see [Ember Nexus API: Get index endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-index)
   */
  getIndex(page: number = 1, pageSize: number | null = null): Promise<Collection> {
    if (pageSize === null) {
      pageSize = Container.get(WebSdkConfiguration).getCollectionPageSize();
    }
    const collectionCacheKey = createIndexCollectionIdentifier(page, pageSize);
    return new Promise<Collection>((resolve) => {
      if (this.collectionCache.has(collectionCacheKey)) {
        const collection = this.collectionCache.get(collectionCacheKey);
        if (collection !== undefined) {
          return resolve(collection);
        }
      }
      return resolve(
        Container.get(GetIndexEndpoint)
          .getIndex(page, pageSize as number)
          .then((collection) => {
            this.collectionCache.set(collectionCacheKey, collection);
            return collection;
          }),
      );
    });
  }

  /**
   * Creates a new node or relation.
   *
   * If the created element is a node, it will become part of the root level, i.e. returned by the get index endpoint.
   * Relations, on the other hand, will be created between their start and end nodes.
   *
   * @param element Data necessary to create the node or relation. The id can be omitted. If it is missing, the API will auto-generate one.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const node: NodeWithOptionalId = {
   *   type: 'Data',
   *   data: {
   *     'some': 'data'
   *   }
   * };
   * const nodeUuid = await emberNexus.postIndex(node);
   * ```
   *
   * @see [Web SDK: Post index endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/post-index)
   * @see [Ember Nexus API: Post index endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/post-index)
   */
  postIndex(element: NodeWithOptionalId | RelationWithOptionalId): Promise<Uuid> {
    return new Promise<Uuid>((resolve) => {
      return resolve(Container.get(PostIndexEndpoint).postIndex(element));
    });
  }

  /**
   * Creates a new node.
   *
   * The created node will be saved as the child of the referenced parent node.
   *
   * **Note**: This endpoint can not be used to create relations, as relations can not be the child of some parent.
   *
   * @param parentUuid The Uuid of the parent node.
   * @param element Data necessary to create the node. The id can be omitted. If it is missing, the API will auto-generate one.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const parentUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * const node: NodeWithOptionalId = {
   *   type: 'Data',
   *   data: {
   *     'some': 'data'
   *   }
   * };
   * const nodeUuid = await emberNexus.postElement(parentUuid, node);
   * ```
   *
   * @see [Web SDK: Post element endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/post-element)
   * @see [Ember Nexus API: Post element endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/post-element)
   */
  postElement(parentUuid: Uuid, element: NodeWithOptionalId): Promise<Uuid> {
    return new Promise<Uuid>((resolve) => {
      // todo: drop cached collections where created element is included
      return resolve(Container.get(PostElementEndpoint).postElement(parentUuid, element));
    });
  }

  /**
   * Updates an element.
   *
   * The provided data will be appended to the element's existing data. Existing properties will be overwritten if the
   * new data contains identical property keys.
   *
   * @param elementUuid The Uuid of the element.
   * @param data New data which should be appended to the element.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const elementUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * const data: Data = {
   *   'some': 'data'
   * };
   * await emberNexus.patchElement(elementUuid, data);
   * ```
   *
   * @see [Web SDK: Patch element endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/patch-element)
   * @see [Ember Nexus API: Patch element endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/patch-element)
   */
  patchElement(elementUuid: Uuid, data: Data): Promise<void> {
    return new Promise<void>((resolve) => {
      // todo: drop cached collections where patched element is included
      this.elementCache.delete(elementUuid);
      return resolve(Container.get(PatchElementEndpoint).patchElement(elementUuid, data));
    });
  }

  /**
   * Replaces an element's data.
   *
   * The provided data will replace the element's existing data.
   *
   * @param elementUuid The Uuid of the element.
   * @param data New data.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const elementUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * const data: Data = {
   *   'new': 'data'
   * };
   * await emberNexus.putElement(elementUuid, data);
   * ```
   *
   * @see [Web SDK: Patch element endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/patch-element)
   * @see [Ember Nexus API: Patch element endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/patch-element)
   */
  putElement(elementUuid: Uuid, data: Data): Promise<void> {
    return new Promise<void>((resolve) => {
      // todo: drop cached collections where updated element is included
      this.elementCache.delete(elementUuid);
      return resolve(Container.get(PutElementEndpoint).putElement(elementUuid, data));
    });
  }

  /**
   * Deletes an element.
   *
   * @param elementUuid The Uuid of the element.
   *
   * @example
   * ```ts
   * const emberNexus = new EmberNexus();
   * const elementUuid = validateUuidFromString("a30d815f-943b-4784-8d84-85a3eec10f54");
   * await emberNexus.deleteElement(elementUuid, data);
   * ```
   *
   * @see [Web SDK: Delete element endpoint](https://ember-nexus.github.io/web-sdk/#/endpoints/element/delete-element)
   * @see [Ember Nexus API: Delete element endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/delete-element)
   */
  deleteElement(elementUuid: Uuid): Promise<void> {
    return new Promise<void>((resolve) => {
      // todo: drop cached collections where deleted element is included
      this.elementCache.delete(elementUuid);
      return resolve(Container.get(DeleteElementEndpoint).deleteElement(elementUuid));
    });
  }
}

export { EmberNexus, Container, WebSdkConfiguration, Logger };
