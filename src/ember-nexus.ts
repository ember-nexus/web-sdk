import { v4 as uuidv4 } from 'uuid';

import { getElement } from './endpoint/get-element.js';
import { Cache } from './type/cache.js';
import { Node } from './type/node.js';
import { Relation } from './type/relation.js';

export class EmberNexus {
  private _elementCache: Cache<Node | Relation>;

  constructor() {
    this._elementCache = new Cache<Node | Relation>();
  }

  async getElement(uuid: typeof uuidv4, cacheOnly = false): Promise<Node | Relation> {
    return new Promise((resolve, reject) => {
      if (this._elementCache.has(uuid)) {
        resolve(this._elementCache.get(uuid));
      }
      if (cacheOnly) {
        reject();
      }
      getElement(uuid)
        .then((element) => {
          this._elementCache.set(uuid, element);
          resolve(element);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
