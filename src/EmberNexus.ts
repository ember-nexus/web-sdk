import 'reflect-metadata';

import { LRUCache } from 'lru-cache';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';
import { Uuid } from '~/Type/Definition/Uuid';

class EmberNexus {
  private cache: LRUCache<Uuid, Node | Relation>;

  constructor() {
    this.cache = new LRUCache<Uuid, Node | Relation>({
      max: Container.get(WebSdkConfiguration).getElementCacheMaxEntries(),
    });
  }

  getElement(uuid: Uuid): Promise<Node | Relation> {
    return new Promise<Node | Relation>((resolve) => {
      if (this.cache.has(uuid)) {
        const element = this.cache.get(uuid);
        if (element !== undefined) {
          return resolve(element);
        }
      }
      return resolve(
        Container.get(GetElementEndpoint)
          .getElement(uuid)
          .then((element) => {
            this.cache.set(uuid, element);
            return element;
          }),
      );
    });
  }
}

export { EmberNexus, Container, WebSdkConfiguration, Logger };
