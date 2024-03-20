import 'reflect-metadata';

import { LRUCache } from 'lru-cache';
import { Container } from 'typedi';

import GetElementChildrenEndpoint from '~/Endpoint/Element/GetElementChildrenEndpoint';
import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import GetElementParentsEndpoint from '~/Endpoint/Element/GetElementParentsEndpoint';
import GetElementRelatedEndpoint from '~/Endpoint/Element/GetElementRelatedEndpoint';
import GetIndexEndpoint from '~/Endpoint/Element/GetIndexEndpoint';
import PatchElementEndpoint from '~/Endpoint/Element/PatchElementEndpoint';
import PostElementEndpoint from '~/Endpoint/Element/PostElementEndpoint';
import PostIndexEndpoint from '~/Endpoint/Element/PostIndexEndpoint';
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

  getElement(uuid: Uuid): Promise<Node | Relation> {
    return new Promise<Node | Relation>((resolve) => {
      if (this.elementCache.has(uuid)) {
        const element = this.elementCache.get(uuid);
        if (element !== undefined) {
          return resolve(element);
        }
      }
      return resolve(
        Container.get(GetElementEndpoint)
          .getElement(uuid)
          .then((element) => {
            this.elementCache.set(uuid, element);
            return element;
          }),
      );
    });
  }

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

  postIndex(element: NodeWithOptionalId | RelationWithOptionalId): Promise<Uuid> {
    return new Promise<Uuid>((resolve) => {
      return resolve(Container.get(PostIndexEndpoint).postIndex(element));
    });
  }

  postElement(parentUuid: Uuid, element: NodeWithOptionalId | RelationWithOptionalId): Promise<Uuid> {
    return new Promise<Uuid>((resolve) => {
      // todo: drop cached collections where created element is included
      return resolve(Container.get(PostElementEndpoint).postElement(parentUuid, element));
    });
  }

  patchElement(uuid: Uuid, data: Data): Promise<void> {
    return new Promise<void>((resolve) => {
      // todo: drop cached collections where patched element is included
      this.elementCache.delete(uuid);
      return resolve(Container.get(PatchElementEndpoint).patchElement(uuid, data));
    });
  }
}

export { EmberNexus, Container, WebSdkConfiguration, Logger };
